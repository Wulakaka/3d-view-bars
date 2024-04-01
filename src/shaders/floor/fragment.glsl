varying vec2 vUv;

uniform vec3 uColorFrom;
uniform vec3 uColorTo;

void main() {
    float d = vUv.x + vUv.y;
    d /= 2.0;

    vec3 color = mix(uColorFrom, uColorTo, d);

    float scale = 12.0;
    scale *= 0.5;

    vec2 alphaUv = vUv - vec2(0.5);
    alphaUv *= 2.0;
    float alphaX = abs(alphaUv.x) > 1.0 / scale * (scale - 1.0) ? 0.0 : 1.0;
    float alphaY = abs(alphaUv.y) > 1.0 / scale * (scale - 1.0) ? 0.0 : 1.0;
    float alpha = alphaX + alphaY;
    alpha = clamp(alpha, 0.0, 1.0);
    alpha *= 0.3;


    // Final color
    gl_FragColor = vec4(color, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
