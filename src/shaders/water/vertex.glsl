varying vec2 vUv;

uniform float uTime;

void main() {
    csm_Position.y += sin(csm_Position.x + uTime * 0.005) * 0.5;

    vUv = uv;
}
