// GLSL: animated water surface with cursor ripples, refracting a procedural caustic field.
export const waterVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const waterFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform float uTime;
  uniform vec2  uMouse;        // 0..1
  uniform vec2  uResolution;
  uniform float uIntensity;    // 0..1
  uniform vec3  uColorDeep;
  uniform vec3  uColorCyan;
  uniform vec3  uColorGlow;

  // Hash + value noise
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 p){
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.02; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = uv;
    p.x *= aspect;

    // Mouse ripple
    vec2 m = uMouse;
    m.x *= aspect;
    float d = distance(p, m);
    float ripple = sin(d * 60.0 - uTime * 4.0) * exp(-d * 6.0) * 0.06 * (0.4 + uIntensity);

    // Auto-drop ripples
    for (int i = 0; i < 3; i++){
      float fi = float(i);
      vec2 dp = vec2(0.3 + 0.2 * fi, 0.4 + 0.15 * sin(uTime * 0.3 + fi));
      dp.x *= aspect;
      float dd = distance(p, dp);
      float t = mod(uTime * 0.6 + fi * 1.7, 4.0);
      ripple += sin(dd * 70.0 - t * 8.0) * exp(-dd * 8.0) * exp(-t * 0.6) * 0.05;
    }

    // Distorted UV for caustics
    vec2 q = uv + ripple;
    float n1 = fbm(q * 4.0 + uTime * 0.08);
    float n2 = fbm(q * 8.0 - uTime * 0.12 + n1);
    float caustic = smoothstep(0.45, 0.95, n2);

    // Vignette + base
    float vign = smoothstep(1.2, 0.2, distance(uv, vec2(0.5)));
    vec3 base = mix(uColorDeep * 0.4, uColorDeep, vign);

    // Cyan glow blended through caustics
    vec3 col = mix(base, uColorCyan, caustic * 0.55 * vign);
    col += uColorGlow * pow(caustic, 3.0) * 0.4;

    // Cursor highlight
    col += uColorCyan * exp(-d * 3.0) * 0.15;

    // Subtle grain
    float grain = (hash(uv * uResolution + uTime) - 0.5) * 0.025;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;
