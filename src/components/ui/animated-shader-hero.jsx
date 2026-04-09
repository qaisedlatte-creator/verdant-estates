import { useRef, useEffect } from 'react'

const SHADER_SRC = `#version 300 es
/*
 * Midnight Ocean – deep navy bioluminescence
 * adapted for Verdant Estates (midnight navy + champagne)
 */
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
uniform vec2 touch;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p){
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p){
  vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p){
  float t=.0,a=1.;mat2 m=mat2(1.,-.5,.2,1.2);
  for(int i=0;i<5;i++){t+=a*noise(p);p*=2.*m;a*=.5;}
  return t;
}
float clouds(vec2 p){
  float d=1.,t=.0;
  for(float i=.0;i<3.;i++){
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a);d=a;p*=2./(i+1.);
  }
  return t;
}
void main(void){
  vec2 uv=(FC-.5*R)/MN, st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.3,-st.y));

  uv*=1.-.25*(sin(T*.12)*.5+.5);

  for(float i=1.;i<12.;i++){
    uv+=.09*cos(i*vec2(.08+.008*i,.75)+i*i+T*.32+.08*uv.x);
    vec2 p=uv;
    float d=length(p);

    /* Deep ocean bioluminescent palette:
       teal-cyan veins with champagne gold core */
    vec3 ocean = cos(sin(i)*vec3(2.4,1.0,0.4))+1.;
    ocean *= vec3(0.25, 0.72, 1.35);   /* teal-blue dominant   */

    vec3 gold  = cos(sin(i+2.)*vec3(0.5,1.2,2.6))+1.;
    gold  *= vec3(1.4, 1.0, 0.22);     /* champagne gold veins */

    float glow = smoothstep(0.6,0.,d);
    col += .0011/d * mix(ocean, gold, glow*0.4);

    float b=noise(i+p+bg*1.5);
    /* deep navy base so background stays dark */
    col += .0015*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col = mix(col, vec3(bg*.04, bg*.06, bg*.14), d*0.9);
  }
  /* slight champagne shimmer on bright spots */
  float lum = dot(col, vec3(0.299,0.587,0.114));
  col = mix(col, col*vec3(1.4,1.1,0.6), smoothstep(0.18,0.6,lum)*0.35);

  col *= 0.68;
  O=vec4(col,1);
}`

class WebGLRenderer {
  constructor(canvas, scale) {
    this.canvas = canvas
    this.scale = scale
    this.gl = canvas.getContext('webgl2')
    this.gl.viewport(0, 0, canvas.width, canvas.height)
    this.mouseMove = [0, 0]
    this.mouseCoords = [0, 0]
    this.pointerCoords = [0, 0]
    this.nbrOfPointers = 0

    this.vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`
    this.vertices = [-1, 1, -1, -1, 1, 1, 1, -1]
  }

  compile(shader, source) {
    const gl = this.gl
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader error:', gl.getShaderInfoLog(shader))
    }
  }

  setup() {
    const gl = this.gl
    this.vs = gl.createShader(gl.VERTEX_SHADER)
    this.fs = gl.createShader(gl.FRAGMENT_SHADER)
    this.compile(this.vs, this.vertexSrc)
    this.compile(this.fs, SHADER_SRC)
    this.program = gl.createProgram()
    gl.attachShader(this.program, this.vs)
    gl.attachShader(this.program, this.fs)
    gl.linkProgram(this.program)
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.program))
    }
  }

  init() {
    const gl = this.gl
    const p = this.program
    this.buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(p, 'position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)
    p.resolution = gl.getUniformLocation(p, 'resolution')
    p.time = gl.getUniformLocation(p, 'time')
    p.move = gl.getUniformLocation(p, 'move')
    p.touch = gl.getUniformLocation(p, 'touch')
    p.pointerCount = gl.getUniformLocation(p, 'pointerCount')
    p.pointers = gl.getUniformLocation(p, 'pointers')
  }

  reset() {
    const gl = this.gl
    if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
      if (this.vs) { gl.detachShader(this.program, this.vs); gl.deleteShader(this.vs) }
      if (this.fs) { gl.detachShader(this.program, this.fs); gl.deleteShader(this.fs) }
      gl.deleteProgram(this.program)
    }
  }

  render(now = 0) {
    const gl = this.gl
    const p = this.program
    if (!p || gl.getProgramParameter(p, gl.DELETE_STATUS)) return
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(p)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    gl.uniform2f(p.resolution, this.canvas.width, this.canvas.height)
    gl.uniform1f(p.time, now * 1e-3)
    gl.uniform2f(p.move, ...this.mouseMove)
    gl.uniform2f(p.touch, ...this.mouseCoords)
    gl.uniform1i(p.pointerCount, this.nbrOfPointers)
    gl.uniform2fv(p.pointers, this.pointerCoords)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }

  updateMove(d) { this.mouseMove = d }
  updateMouse(c) { this.mouseCoords = c }
  updatePointerCoords(c) { this.pointerCoords = c }
  updatePointerCount(n) { this.nbrOfPointers = n }
  updateScale(s) {
    this.scale = s
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
  }
}

export function useShaderBackground() {
  const canvasRef = useRef(null)
  const rafRef = useRef()
  const rendererRef = useRef(null)
  const pointersRef = useRef({ count: 0, first: [0, 0], coords: [0, 0], move: [0, 0] })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio)

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      rendererRef.current?.updateScale(dpr)
    }

    rendererRef.current = new WebGLRenderer(canvas, dpr)
    rendererRef.current.setup()
    rendererRef.current.init()
    resize()

    // Mouse tracking
    const onMove = (e) => {
      pointersRef.current.first = [e.clientX * dpr, canvas.height - e.clientY * dpr]
      pointersRef.current.move = [e.movementX, e.movementY]
    }
    canvas.addEventListener('pointermove', onMove)

    const loop = (now) => {
      rendererRef.current?.updateMouse(pointersRef.current.first)
      rendererRef.current?.updateMove(pointersRef.current.move)
      rendererRef.current?.render(now)
      rafRef.current = requestAnimationFrame(loop)
    }
    loop(0)

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(rafRef.current)
      rendererRef.current?.reset()
    }
  }, [])

  return canvasRef
}

export default function ShaderHero({ children, className = '' }) {
  const canvasRef = useShaderBackground()
  return (
    <div className={`relative w-full overflow-hidden bg-black ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full touch-none"
        style={{ display: 'block' }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
