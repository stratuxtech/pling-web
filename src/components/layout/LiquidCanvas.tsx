"use client";

import { useEffect, useRef } from "react";

/*
 * Remate líquido del footer (make-b.studio usa un shader de "warp" en WebGL).
 * Versión Pling: fbm con doble deformación de dominio, Azul Pling ↔ coral ↔ rojo,
 * que sube desde el borde inferior sobre el fondo blanco. Solo se anima en
 * pantalla; con reduced-motion pinta un único fotograma.
 */
const FRAG = `
precision mediump float;
uniform vec2 r;
uniform float t;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1.,0.)),u.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/r;
  vec2 p=vec2(uv.x*r.x/r.y,uv.y)*0.75;
  float s=t*.05;
  vec2 q=vec2(fbm(p+vec2(0.,s)),fbm(p+vec2(5.2,1.3)-s));
  vec2 w=vec2(fbm(p+1.6*q+vec2(1.7,9.2)+s*1.2),fbm(p+1.6*q+vec2(8.3,2.8)-s));
  float f=fbm(p+1.5*w);
  vec3 blue=vec3(.271,.302,.957);
  vec3 sky=vec3(.612,.627,1.);
  vec3 coral=vec3(1.,.29,.239);
  vec3 red=vec3(.698,.192,.098);
  vec3 col=mix(blue,sky,smoothstep(.2,.55,q.y)*.55);
  col=mix(col,coral,smoothstep(.5,.82,f+w.x*.2)*.85);
  col=mix(col,red,smoothstep(.7,.95,w.y)*.3);
  float surface=.55+(f-.5)*.55+sin(uv.x*2.4+t*.3)*.06;
  float a=smoothstep(surface+.05,surface-.05,uv.y);
  gl_FragColor=vec4(col*a,a);
}`;
const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

export function LiquidCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl) {
      canvas.dataset.fallback = "";
      return;
    }
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      canvas.dataset.fallback = "";
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(prog, "r");
    const uT = gl.getUniformLocation(prog, "t");

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = false;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const draw = (now: number) => {
      resize();
      gl.uniform2f(uR, canvas.width, canvas.height);
      gl.uniform1f(uT, reduce ? 12 : (now - start) / 1000);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (visible && !reduce) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    draw(performance.now());
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
