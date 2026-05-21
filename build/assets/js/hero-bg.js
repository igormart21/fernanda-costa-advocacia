/**
 * Hero Background — Cinematic Legal Icons Animation
 * Premium dark luxury animated background
 */
(function() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let mouse = { x: 0, y: 0 };
  let W, H;

  // ─── Resize ───────────────────────────────────────────────
  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // ─── Mouse Parallax ───────────────────────────────────────
  document.addEventListener('mousemove', e => {
    mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ─── Gold Colors ──────────────────────────────────────────
  const GOLD   = '#C6A15B';
  const GOLD_A = (a) => `rgba(198,161,91,${a})`;
  const WHITE_A= (a) => `rgba(255,255,255,${a})`;

  // ─── Icon Paths (SVG-style, normalized 0–100) ─────────────
  const icons = [

    // Scales of Justice
    (ctx, s) => {
      ctx.beginPath();
      // vertical bar
      ctx.moveTo(50*s, 5*s); ctx.lineTo(50*s, 95*s);
      // base
      ctx.moveTo(25*s, 95*s); ctx.lineTo(75*s, 95*s);
      // horizontal arm
      ctx.moveTo(10*s, 25*s); ctx.lineTo(90*s, 25*s);
      // left pan
      ctx.moveTo(10*s, 25*s); ctx.lineTo(5*s,  55*s);
      ctx.arc(10*s, 55*s, 5*s, Math.PI, 0);
      ctx.lineTo(15*s, 25*s);
      // right pan
      ctx.moveTo(90*s, 25*s); ctx.lineTo(85*s, 55*s);
      ctx.arc(90*s, 55*s, 5*s, Math.PI, 0);
      ctx.lineTo(95*s, 25*s);
      // center knob
      ctx.moveTo(53*s, 25*s); ctx.arc(50*s, 25*s, 3*s, 0, Math.PI*2);
      ctx.stroke();
    },

    // Gavel
    (ctx, s) => {
      ctx.beginPath();
      // handle
      ctx.moveTo(30*s, 70*s); ctx.lineTo(75*s, 25*s);
      // head
      ctx.save();
      ctx.translate(20*s, 20*s);
      ctx.rotate(Math.PI/4);
      roundRect(ctx, -8*s, -18*s, 16*s, 36*s, 3*s);
      ctx.restore();
      // strike plate
      ctx.moveTo(10*s, 88*s); ctx.lineTo(55*s, 88*s);
      ctx.stroke();
    },

    // Legal Document / Contract
    (ctx, s) => {
      ctx.beginPath();
      roundRect(ctx, 15*s, 5*s, 70*s, 90*s, 4*s);
      // lines
      for (let i = 0; i < 6; i++) {
        ctx.moveTo(25*s, (22 + i*12)*s);
        ctx.lineTo(i === 5 ? 55*s : 75*s, (22 + i*12)*s);
      }
      // signature squiggle
      ctx.moveTo(25*s, 82*s);
      ctx.bezierCurveTo(35*s,74*s, 45*s,90*s, 55*s,82*s);
      ctx.stroke();
    },

    // Shield
    (ctx, s) => {
      ctx.beginPath();
      ctx.moveTo(50*s, 5*s);
      ctx.lineTo(85*s, 22*s);
      ctx.lineTo(85*s, 52*s);
      ctx.bezierCurveTo(85*s,75*s, 50*s,95*s, 50*s,95*s);
      ctx.bezierCurveTo(50*s,95*s, 15*s,75*s, 15*s,52*s);
      ctx.lineTo(15*s, 22*s);
      ctx.closePath();
      // inner check
      ctx.moveTo(35*s, 50*s);
      ctx.lineTo(46*s, 62*s);
      ctx.lineTo(66*s, 38*s);
      ctx.stroke();
    },

    // Courthouse Columns
    (ctx, s) => {
      ctx.beginPath();
      // roof
      ctx.moveTo(5*s, 28*s); ctx.lineTo(95*s, 28*s);
      ctx.moveTo(15*s, 20*s); ctx.lineTo(85*s, 20*s);
      ctx.moveTo(25*s, 12*s); ctx.lineTo(75*s, 12*s);
      // 4 columns
      [20,36,52,68,84].forEach(x => {
        ctx.moveTo(x*s, 28*s); ctx.lineTo(x*s, 88*s);
      });
      // base
      ctx.moveTo(5*s, 88*s); ctx.lineTo(95*s, 88*s);
      ctx.moveTo(8*s, 94*s); ctx.lineTo(92*s, 94*s);
      ctx.stroke();
    },

    // Law Book
    (ctx, s) => {
      ctx.beginPath();
      // book body
      roundRect(ctx, 20*s, 8*s, 62*s, 84*s, 3*s);
      // spine
      ctx.moveTo(32*s, 8*s); ctx.lineTo(32*s, 92*s);
      // pages lines
      for (let i = 0; i < 5; i++) {
        ctx.moveTo(40*s, (22 + i*13)*s);
        ctx.lineTo(72*s, (22 + i*13)*s);
      }
      // bookmark
      ctx.moveTo(58*s, 8*s); ctx.lineTo(58*s, 28*s);
      ctx.lineTo(65*s, 22*s); ctx.lineTo(72*s, 28*s); ctx.lineTo(72*s, 8*s);
      ctx.stroke();
    },

    // Balance / Libra Symbol
    (ctx, s) => {
      ctx.beginPath();
      // circle top
      ctx.arc(50*s, 35*s, 20*s, 0, Math.PI*2);
      // stem
      ctx.moveTo(50*s, 55*s); ctx.lineTo(50*s, 85*s);
      // base
      ctx.moveTo(25*s, 85*s); ctx.lineTo(75*s, 85*s);
      // inner lines (scales symbol)
      ctx.moveTo(30*s, 35*s); ctx.lineTo(70*s, 35*s);
      ctx.moveTo(40*s, 26*s); ctx.lineTo(60*s, 26*s);
      ctx.stroke();
    },

    // Quill / Signature
    (ctx, s) => {
      ctx.beginPath();
      // quill
      ctx.moveTo(80*s, 5*s);
      ctx.bezierCurveTo(20*s,30*s, 55*s,60*s, 30*s,95*s);
      ctx.moveTo(80*s, 5*s);
      ctx.bezierCurveTo(95*s,25*s, 55*s,55*s, 30*s,95*s);
      // nib
      ctx.moveTo(30*s, 95*s); ctx.lineTo(25*s, 80*s);
      ctx.lineTo(38*s, 85*s); ctx.lineTo(30*s, 95*s);
      // underline signature
      ctx.moveTo(15*s, 92*s);
      ctx.bezierCurveTo(30*s,88*s, 50*s,96*s, 75*s,90*s);
      ctx.stroke();
    },

    // Star of Justice (5-pointed)
    (ctx, s) => {
      ctx.beginPath();
      const cx=50*s, cy=48*s, r1=35*s, r2=15*s;
      for(let i=0;i<10;i++){
        const angle = (i*Math.PI/5) - Math.PI/2;
        const r = i%2===0 ? r1 : r2;
        i===0 ? ctx.moveTo(cx+r*Math.cos(angle),cy+r*Math.sin(angle))
              : ctx.lineTo(cx+r*Math.cos(angle),cy+r*Math.sin(angle));
      }
      ctx.closePath();
      ctx.stroke();
    },

    // Paragraph Symbol §
    (ctx, s) => {
      ctx.font = `bold ${60*s}px serif`;
      ctx.textAlign='center';
      ctx.textBaseline='middle';
      ctx.strokeText('§', 50*s, 50*s);
      ctx.textAlign='left';
    },
  ];

  // ─── Helper: rounded rect path ───────────────────────────
  function roundRect(ctx, x, y, w, h, r) {
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y); ctx.arcTo(x+w,y, x+w,y+r, r);
    ctx.lineTo(x+w, y+h-r); ctx.arcTo(x+w,y+h, x+w-r,y+h, r);
    ctx.lineTo(x+r, y+h); ctx.arcTo(x,y+h, x,y+h-r, r);
    ctx.lineTo(x, y+r); ctx.arcTo(x,y, x+r,y, r);
    ctx.closePath();
  }

  // ─── Particles ───────────────────────────────────────────
  const particles = [];
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.0003 + 0.0001,
      opacity: Math.random() * 0.4 + 0.05,
      phase: Math.random() * Math.PI * 2,
    });
  }

  // ─── Icon Objects ─────────────────────────────────────────
  const objects = [];
  const count = 18;
  for (let i = 0; i < count; i++) {
    const layer  = Math.random(); // 0 = back, 1 = front
    const scale  = (0.04 + layer * 0.12) * (Math.random() * 0.6 + 0.7);
    const speed  = (0.0001 + layer * 0.0002) * (Math.random() * 0.5 + 0.75);
    const angle  = Math.random() * Math.PI * 2;
    const drift  = (Math.random() - 0.5) * 0.0008;
    objects.push({
      x: Math.random(),
      y: Math.random(),
      icon: Math.floor(Math.random() * icons.length),
      scale,
      layer,
      speed,
      angle,
      drift,
      phase: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed * 0.6,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.0005,
      baseOpacity: layer < 0.33
        ? Math.random() * 0.06 + 0.04   // background: 4–10%
        : Math.random() * 0.09 + 0.06,  // foreground: 6–15%
      opacity: 0,
      targetOpacity: 0,
      blur: layer < 0.4 ? Math.random() * 4 + 2 : 0,
    });
    objects[objects.length-1].targetOpacity = objects[objects.length-1].baseOpacity;
  }

  // ─── Cinematic Particles (floating dust) ──────────────────
  const dust = [];
  for (let i = 0; i < 120; i++) {
    dust.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      vx: (Math.random()-0.5)*0.15,
      vy: -Math.random()*0.25 - 0.05,
      alpha: Math.random()*0.25 + 0.05,
      life: Math.random(),
    });
  }

  // ─── Main Draw Loop ───────────────────────────────────────
  let t = 0;
  function draw() {
    t += 0.008;

    // Background gradient
    const grad = ctx.createRadialGradient(W*0.5, H*0.4, 0, W*0.5, H*0.5, W*0.9);
    grad.addColorStop(0,   '#0f0d09');
    grad.addColorStop(0.5, '#080808');
    grad.addColorStop(1,   '#050505');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Ambient gold glow at center-top
    const glow = ctx.createRadialGradient(W*0.5, H*0.15, 0, W*0.5, H*0.35, W*0.55);
    glow.addColorStop(0,   'rgba(214,179,106,0.07)');
    glow.addColorStop(0.5, 'rgba(198,161,91,0.03)');
    glow.addColorStop(1,   'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // ── Dust particles ─────────────────────────────────────
    dust.forEach(d => {
      d.x += d.vx + mouse.x * 0.15;
      d.y += d.vy;
      d.life -= 0.002;
      if (d.y < -5 || d.life <= 0) {
        d.x = Math.random() * W;
        d.y = H + 5;
        d.life = 1;
        d.alpha = Math.random()*0.2+0.05;
      }
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI*2);
      ctx.fillStyle = GOLD_A(d.alpha * Math.min(d.life*3, 1));
      ctx.fill();
    });

    // ── Static particles ───────────────────────────────────
    particles.forEach(p => {
      const pulse = Math.sin(t * 1.2 + p.phase) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(p.x*W, p.y*H, p.size, 0, Math.PI*2);
      ctx.fillStyle = GOLD_A(p.opacity * pulse * 0.5);
      ctx.fill();
    });

    // ── Legal Icon Objects ─────────────────────────────────
    objects.forEach(obj => {
      // Move
      obj.x += obj.vx + mouse.x * obj.layer * 0.001;
      obj.y += obj.vy + mouse.y * obj.layer * 0.0008;
      obj.rotation += obj.rotSpeed;

      // Wrap around
      if (obj.x > 1.15) obj.x = -0.15;
      if (obj.x < -0.15) obj.x = 1.15;
      if (obj.y > 1.15) obj.y = -0.15;
      if (obj.y < -0.15) obj.y = 1.15;

      // Breathing opacity
      const breath = Math.sin(t * 0.8 + obj.phase) * 0.3 + 0.7;
      const target = obj.baseOpacity * breath;
      obj.opacity += (target - obj.opacity) * 0.02;

      const px = obj.x * W;
      const py = obj.y * H;
      const s  = obj.scale;

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(obj.rotation);
      ctx.translate(-50*s, -50*s);

      // Blur for background layers
      if (obj.blur > 0) {
        ctx.filter = `blur(${obj.blur}px)`;
      }

      // Glow effect
      ctx.shadowColor  = GOLD_A(obj.opacity * 1.5);
      ctx.shadowBlur   = 18 * obj.layer + 6;
      ctx.strokeStyle  = GOLD_A(obj.opacity);
      ctx.lineWidth    = Math.max(0.5, 1.2 * s / 0.1);
      ctx.lineCap      = 'round';
      ctx.lineJoin     = 'round';

      try { icons[obj.icon](ctx, s); } catch(e){}

      ctx.restore();
    });

    // Vignette overlay
    const vignette = ctx.createRadialGradient(W*0.5,H*0.5,H*0.2, W*0.5,H*0.5,H*0.85);
    vignette.addColorStop(0, 'transparent');
    vignette.addColorStop(1, 'rgba(5,5,5,0.65)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0,0,W,H);

    requestAnimationFrame(draw);
  }

  draw();
})();
