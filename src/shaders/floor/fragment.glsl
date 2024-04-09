varying vec2 vUv;

uniform vec3 uColorFrom;
uniform vec3 uColorTo;

void main() {
    float d = vUv.x + vUv.y;
    d /= 2.0;

    vec3 color = mix(uColorFrom, uColorTo, d);

    // Final color
    gl_FragColor = vec4(color, 0.3);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
