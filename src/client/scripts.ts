import { escapeHtml } from '../templates/resume';

const DIAGNOSTICS_BODY = `
      if (window._diagActive) return;
      window._diagActive = true;

      let cd = {
        "browser identity": {}, "hardware & gpu": {}, "screen & window": {},
        "network & power": {}, "preferences & accessibility": {},
        "performance & DOM": {}, "multimedia & permissions": {},
        "typography & fonts": {}
      };

      try {
        cd["browser identity"] = {
          user_agent: navigator.userAgent,
          client_hints: navigator.userAgentData ? navigator.userAgentData.brands.map(b => b.brand + ' v' + b.version).join(', ') : 'unknown',
          mobile: navigator.userAgentData ? navigator.userAgentData.mobile : 'unknown',
          vendor: navigator.vendor,
          pdf_viewer_enabled: navigator.pdfViewerEnabled,
          webdriver: navigator.webdriver,
          language: navigator.language,
          languages: navigator.languages,
          local_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };

        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        let gpu_vendor = 'unknown', gpu_renderer = 'unknown', webgl_version = 'unknown';
        if (gl) {
          webgl_version = gl.getParameter(gl.VERSION);
          const ext = gl.getExtension('WEBGL_debug_renderer_info');
          if (ext) {
            gpu_vendor = gl.getParameter(ext.UNMASKED_VENDOR_WEBGL);
            gpu_renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
          }
        }
        cd["hardware & gpu"] = {
          concurrency: navigator.hardwareConcurrency,
          device_memory_gb: navigator.deviceMemory,
          platform: navigator.platform,
          max_touch_points: navigator.maxTouchPoints,
          gpu_vendor,
          gpu_renderer,
          webgl_version
        };

        cd["screen & window"] = {
          resolution: screen.width + 'x' + screen.height,
          available_resolution: screen.availWidth + 'x' + screen.availHeight,
          window_inner: window.innerWidth + 'x' + window.innerHeight,
          window_outer: window.outerWidth + 'x' + window.outerHeight,
          color_depth: screen.colorDepth,
          pixel_ratio: window.devicePixelRatio,
          color_gamut: window.matchMedia('(color-gamut: p3)').matches ? 'p3' : (window.matchMedia('(color-gamut: srgb)').matches ? 'srgb' : 'standard'),
          orientation: screen.orientation ? screen.orientation.type : 'unknown'
        };

        cd["network & power"] = {
          effective_type: navigator.connection ? navigator.connection.effectiveType : 'unknown',
          downlink_mbps: navigator.connection ? navigator.connection.downlink : 'unknown',
          rtt_ms: navigator.connection ? navigator.connection.rtt : 'unknown',
          save_data: navigator.connection ? navigator.connection.saveData : 'unknown',
          battery_charging: 'fetching...',
          battery_level: 'fetching...'
        };

        cd["preferences & accessibility"] = {
          color_scheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
          reduced_motion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
          contrast: window.matchMedia('(prefers-contrast: more)').matches ? 'more' : 'standard',
          any_pointer: window.matchMedia('(any-pointer: fine)').matches ? 'fine' : (window.matchMedia('(any-pointer: coarse)').matches ? 'coarse' : 'none'),
          do_not_track: navigator.doNotTrack === '1' || navigator.doNotTrack === 'yes',
          cookies_enabled: navigator.cookieEnabled
        };

        const nav = performance.getEntriesByType('navigation')[0];
        cd["performance & DOM"] = {
          page_load_time_ms: nav ? Math.round(nav.loadEventEnd - nav.startTime) : 'unknown',
          ttfb_ms: nav ? Math.round(nav.responseStart - nav.requestStart) : 'unknown',
          dom_interactive_ms: nav ? Math.round(nav.domInteractive - nav.startTime) : 'unknown',
          js_heap_used_mb: performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576 * 100) / 100 : 'unknown',
          resource_count: performance.getEntriesByType('resource').length,
          history_length: window.history.length,
          document_ready_state: document.readyState
        };

        let ac_sample_rate = 'unknown', ac_state = 'unknown';
        try {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          if (AudioCtx) {
            const ac = new AudioCtx();
            ac_sample_rate = ac.sampleRate;
            ac_state = ac.state;
            if (typeof ac.close === 'function') ac.close().catch(() => {});
          }
        } catch(e){}

        cd["multimedia & permissions"] = {
          audio_sample_rate: ac_sample_rate,
          audio_context_state: ac_state,
          permissions: {}
        };

        const fctx = document.createElement("canvas").getContext("2d");
        const detected = [];
        if (fctx) {
          const testString = "mmmmmmmmmmlli";
          const baseFonts = ["monospace", "sans-serif", "serif"];
          const baselineWidths = {};
          for (let base of baseFonts) {
            fctx.font = "72px " + base;
            baselineWidths[base] = fctx.measureText(testString).width;
          }
          const testFonts = [
            "Arial", "Calibri", "Comic Sans MS", "Consolas", "Courier New", "Georgia",
            "Impact", "Lucida Console", "Palatino Linotype", "Segoe UI", "Tahoma",
            "Times New Roman", "Trebuchet MS", "Verdana",
            "Helvetica Neue", "Menlo", "Monaco", "PingFang SC", "San Francisco",
            "Ubuntu", "Liberation Sans", "DejaVu Sans", "FreeSans",
            "Roboto", "Open Sans", "Lato", "Montserrat", "Oswald",
            "Adobe Clean", "Myriad Pro", "Minion Pro"
          ];
          for (let font of testFonts) {
            let found = false;
            for (let base of baseFonts) {
              fctx.font = "72px '" + font + "', " + base;
              if (fctx.measureText(testString).width !== baselineWidths[base]) {
                found = true;
                break;
              }
            }
            if (found) detected.push(font);
          }
        }
        cd["typography & fonts"] = {
          installed_fonts: detected,
          total_detected: detected.length
        };
      } catch(err){}

      try {
        if (navigator.getBattery) {
          const b = await navigator.getBattery();
          cd["network & power"].battery_charging = b.charging;
          cd["network & power"].battery_level = b.level;
        } else {
          cd["network & power"].battery_charging = 'api_unavailable';
          cd["network & power"].battery_level = 'api_unavailable';
        }
      } catch(err){}

      try {
        if (navigator.permissions && navigator.permissions.query) {
          const p_geo = await navigator.permissions.query({name:'geolocation'}).catch(()=>({state:'unknown'}));
          const p_notif = await navigator.permissions.query({name:'notifications'}).catch(()=>({state:'unknown'}));
          const p_cam = await navigator.permissions.query({name:'camera'}).catch(()=>({state:'unknown'}));
          cd["multimedia & permissions"].permissions = {
            geolocation: p_geo.state,
            notifications: p_notif.state,
            camera: p_cam.state
          };
        }
      } catch(err){}

      const rawP = {
        STATUS: window._authMode ? "DEEP_DIAGNOSTICS_MAXIMALIST (MOBILE_AUTH)" : "DEEP_DIAGNOSTICS_MAXIMALIST",
        TIMESTAMP: new Date().toISOString(),
        ...window._sd,
        ...cd
      };
      const sortZtoAAndSlop = x => {
        if (typeof x === 'string') return x.toLowerCase().replace(/[^a-z0-9\\s]/g, ' ').replace(/\\s+/g, ' ').trim();
        if (Array.isArray(x)) return x.map(sortZtoAAndSlop);
        if (x !== null && typeof x === 'object') {
          const r = {};
          const cleanKeys = Object.keys(x).map(k => ({
            orig: k,
            clean: k.toLowerCase().replace(/[^a-z0-9\\s]/g, ' ').replace(/\\s+/g, ' ').trim() || 'unnamed'
          }));
          cleanKeys.sort((a, b) => a.clean > b.clean ? -1 : a.clean < b.clean ? 1 : 0);
          for (let obj of cleanKeys) r[obj.clean] = sortZtoAAndSlop(x[obj.orig]);
          return r;
        }
        return x;
      };
      const sortedP = sortZtoAAndSlop(rawP);
      if (!window._authMode && !window._savedFragment) {
        window._savedBodyClass = document.body.className;
        const frag = document.createDocumentFragment();
        while (document.body.firstChild) frag.appendChild(document.body.firstChild);
        window._savedFragment = frag;
      }
      document.body.className = '';
      const hasSaved = !!window._savedFragment;

      const styleEl = document.createElement('style');
      styleEl.textContent = 'body{margin:0;padding:0;background:#050505;}@keyframes blink { 0% {opacity:1;} 50% {opacity:0;} 100% {opacity:1;} }';

      const container = document.createElement('div');
      container.style.cssText = "background:#050505;color:#00ff41;padding:2rem;font-family:'JetBrains Mono',monospace;min-height:100vh;margin:0;box-sizing:border-box;";

      const heading = document.createElement('h2');
      heading.style.cssText = 'color:#00ff41;margin-top:0;text-shadow:0 0 5px #00ff41;overflow-wrap:break-word;';
      heading.textContent = 'maximalist telemetry authorized';

      const pre = document.createElement('pre');
      pre.style.cssText = 'white-space:pre-wrap;word-wrap:break-word;font-size:12px;line-height:1.4;overflow-x:hidden;';
      pre.textContent = JSON.stringify(sortedP, null, 2);

      const cursor = document.createElement('div');
      cursor.style.cssText = 'margin-top:20px;animation:blink 1s infinite;';
      cursor.textContent = '\\u2588';

      const backWrap = document.createElement('div');
      backWrap.style.cssText = 'margin-top:20px;';
      const backLink = document.createElement('a');
      backLink.id = 'back-to-resume';
      backLink.style.cssText = 'color:#00ff41;text-decoration:underline;font-family:inherit;font-size:12px;cursor:pointer;';
      backLink.textContent = "\\u2190 back to jordan's resume";
      if (hasSaved) {
        backLink.setAttribute('role', 'button');
        backLink.setAttribute('tabindex', '0');
        backLink.setAttribute('title', 'restores your original DOM from a DocumentFragment in RAM; zero packets will be sent');
      } else {
        backLink.setAttribute('href', '/');
        backLink.setAttribute('title', 'navigates back to /');
      }
      backWrap.appendChild(backLink);

      container.appendChild(heading);
      container.appendChild(pre);
      container.appendChild(cursor);
      container.appendChild(backWrap);

      document.body.replaceChildren(styleEl, container);

      if (window._savedFragment) {
        const restoreResume = (e) => {
          if (e) e.preventDefault();
          document.body.replaceChildren(window._savedFragment);
          document.body.className = window._savedBodyClass || '';
          window._savedFragment = null;
          window._diagActive = false;
          window.scrollTo(0, 0);
        };
        window._restoreResume = restoreResume;
        backLink.addEventListener('click', restoreResume);
        backLink.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') restoreResume(e);
        });
      }
      window.scrollTo(0, 0);
`;

export function buildResumeClientScript(safeDataJson: string, nonce: string): string {
	const safeNonce = escapeHtml(nonce);
	return `<script nonce="${safeNonce}">
      window._sd = ${safeDataJson};
      window._authMode = false;
      (function () {
        const themeButtons = document.getElementById('theme-buttons');
        if (themeButtons) {
          themeButtons.addEventListener('click', (e) => {
            const btn = e.target instanceof Element ? e.target.closest('button[data-theme]') : null;
            if (btn) document.body.className = btn.getAttribute('data-theme') || '';
          });
        }

        const getIp = url => fetch(url).then(r => r.ok ? r.text() : Promise.reject()).then(t => t.trim()).catch(() => null);
        Promise.all([getIp('https://ipv6.icanhazip.com'), getIp('https://ipv4.icanhazip.com')]).then(([v6, v4]) => {
          const ipEl = document.getElementById('ip-display');
          if (!ipEl) return;
          const out = [];
          if (v6) out.push('client ipv6: ' + v6);
          if (v4) out.push('client ipv4: ' + v4);
          if (!v6 && !v4) out.push('client ipv6: unknown', 'client ipv4: unknown (fetch failed)');
          out.push('gcp dns: 8.8.8.8');
          ipEl.textContent = out.join(' \\u00b7 ');
        });

        const edge = window._sd["edge metadata"] || {};
        const net = window._sd["tls & network"] || {};

        const pathEl = document.getElementById('path-display');
        const detailsEl = document.getElementById('plumbing-details');
        const bodyEl = document.getElementById('plumbing-body');

        const doh = (name, type) =>
          fetch('https://dns.google/resolve?name=' + encodeURIComponent(name) + '&type=' + type)
            .then(r => r.ok ? r.json() : null)
            .then(j => (j && j.Answer) ? j.Answer.filter(a => a.type === (type === 'AAAA' ? 28 : 1)).map(a => a.data) : [])
            .catch(() => []);

        const renderPath = (edgeIp) => {
          if (!pathEl) return;
          const asn = net.asn ? 'as' + net.asn : 'as?';
          const org = net.as_org ? ' (' + String(net.as_org).toLowerCase() + ')' : '';
          const clientIp = (net.ip && net.ip !== 'UNKNOWN') ? net.ip : 'client';
          const leg = [];
          if (net.client_tcp_rtt !== undefined && net.client_tcp_rtt !== null) leg.push(net.client_tcp_rtt + 'ms tcp');
          if (net.http_protocol) leg.push(String(net.http_protocol).toLowerCase());
          if (net.tls_version) leg.push(String(net.tls_version).toLowerCase().replace('tlsv', 'tls '));
          const legStr = leg.length ? leg.join(' \\u00b7 ') : 'https';
          const colo = edge.colo ? String(edge.colo).toLowerCase() : 'unknown';
          const targetIp = edgeIp ? ' [' + edgeIp + ']' : '';
          pathEl.textContent = [
            asn + org + ' [' + clientIp + ']',
            legStr,
            'as13335 (cloudflare @ ' + colo + ')' + targetIp
          ].join('\\n');
        };

        renderPath(null);
        const host = location.hostname;
        if (host && host !== 'localhost' && host !== '127.0.0.1') {
          Promise.all([doh(host, 'AAAA'), doh(host, 'A')]).then(([v6s, v4s]) => {
            const clientIsV6 = net.ip && net.ip.indexOf(':') !== -1;
            const picked = (clientIsV6 && v6s[0]) ? v6s[0] : (v4s[0] || v6s[0] || null);
            if (picked) renderPath(picked);
          });
        }

        const COLO_COORDS = {
          ATL:[33.64,-84.43],BOS:[42.37,-71.01],BUF:[42.94,-78.73],CLT:[35.21,-80.94],
          ORD:[41.97,-87.91],CMH:[40.00,-82.89],DFW:[32.90,-97.04],DEN:[39.86,-104.67],
          DTW:[42.21,-83.36],IAH:[29.99,-95.34],IND:[39.72,-86.29],JAX:[30.49,-81.69],
          MCI:[39.30,-94.71],LAS:[36.08,-115.15],LAX:[33.94,-118.41],MEM:[35.04,-89.98],
          MIA:[25.80,-80.29],MSP:[44.88,-93.22],BNA:[36.12,-86.68],EWR:[40.69,-74.17],
          JFK:[40.64,-73.78],ORF:[36.90,-76.20],OMA:[41.30,-95.89],MCO:[28.43,-81.31],
          PHL:[39.87,-75.24],PHX:[33.43,-112.01],PIT:[40.49,-80.23],PDX:[45.59,-122.60],
          RDU:[35.88,-78.79],RIC:[37.51,-77.32],SMF:[38.70,-121.59],SLC:[40.79,-111.98],
          SAN:[32.73,-117.19],SJC:[37.36,-121.93],SFO:[37.62,-122.38],SEA:[47.45,-122.31],
          STL:[38.75,-90.37],TPA:[27.98,-82.53],IAD:[38.95,-77.46],YYZ:[43.68,-79.63],
          YUL:[45.47,-73.74],YVR:[49.19,-123.18],MEX:[19.44,-99.07],GRU:[-23.44,-46.47],
          GIG:[-22.81,-43.25],EZE:[-34.82,-58.54],BOG:[4.70,-74.15],SCL:[-33.39,-70.79],
          LHR:[51.47,-0.45],MAN:[53.35,-2.28],AMS:[52.31,4.76],FRA:[50.04,8.56],
          MUC:[48.35,11.79],CDG:[49.01,2.55],MAD:[40.47,-3.56],BCN:[41.30,2.08],
          MXP:[45.63,8.72],ZRH:[47.46,8.55],VIE:[48.11,16.57],WAW:[52.17,20.97],
          ARN:[59.65,17.92],CPH:[55.62,12.66],DUB:[53.43,-6.27],LIS:[38.78,-9.14],
          NRT:[35.76,140.39],HND:[35.55,139.78],KIX:[34.43,135.24],ICN:[37.46,126.44],
          SIN:[1.36,103.99],HKG:[22.31,113.92],TPE:[25.08,121.23],BOM:[19.09,72.87],
          DEL:[28.56,77.10],SYD:[-33.95,151.18],MEL:[-37.67,144.84],AKL:[-37.01,174.79]
        };

        const haversineKm = (lat1, lon1, lat2, lon2) => {
          const toRad = d => d * Math.PI / 180;
          const R = 6371;
          const dLat = toRad(lat2 - lat1);
          const dLon = toRad(lon2 - lon1);
          const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
          return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        };

        const getDomByteLength = () => {
          const html = document.documentElement.outerHTML;
          return typeof TextEncoder === 'function' ? new TextEncoder().encode(html).length : html.length;
        };

        let loadedPlumbing = false;
        if (detailsEl && bodyEl) {
          detailsEl.addEventListener('toggle', async () => {
            if (!detailsEl.open || loadedPlumbing) return;
            loadedPlumbing = true;
            bodyEl.textContent = 'querying bgp prefix & fiber path...';

            const ip = (net.ip && net.ip !== 'UNKNOWN') ? net.ip : null;
            let prefix = null, rir = null;
            const tracePromise = fetch('/cdn-cgi/trace')
              .then(r => r.ok ? r.text() : '')
              .then(txt => {
                const map = {};
                txt.split('\\n').forEach(line => {
                  const idx = line.indexOf('=');
                  if (idx > 0) map[line.slice(0, idx)] = line.slice(idx + 1).trim();
                });
                return map;
              })
              .catch(() => ({}));

            const [netInfo, rirInfo, trace] = await Promise.all([
              ip ? fetch('https://stat.ripe.net/data/network-info/data.json?resource=' + encodeURIComponent(ip))
                .then(r => r.ok ? r.json() : null).catch(() => null) : Promise.resolve(null),
              ip ? fetch('https://stat.ripe.net/data/rir/data.json?resource=' + encodeURIComponent(ip) + '&lod=2')
                .then(r => r.ok ? r.json() : null).catch(() => null) : Promise.resolve(null),
              tracePromise
            ]);
            if (netInfo && netInfo.data && netInfo.data.prefix) prefix = netInfo.data.prefix;
            if (rirInfo && rirInfo.data && rirInfo.data.rirs && rirInfo.data.rirs[0]) {
              rir = String(rirInfo.data.rirs[0].rir).toLowerCase();
            }

            const lines = [];
            const parts = [];
            const asnStr = net.asn ? 'as' + net.asn : 'as?';
            if (prefix) {
              parts.push('bgp prefix: ' + prefix + ' (' + (rir ? rir + ' \\u00b7 ' : '') + asnStr + ')');
            } else {
              parts.push('bgp: ' + asnStr + (net.as_org ? ' (' + String(net.as_org).toLowerCase() + ')' : ''));
            }

            const coloKey = edge.colo ? String(edge.colo).toUpperCase() : null;
            const coloXY = coloKey ? COLO_COORDS[coloKey] : null;
            const cLat = parseFloat(edge.latitude);
            const cLon = parseFloat(edge.longitude);
            const rtt = Number(net.client_tcp_rtt);
            const hasRtt = net.client_tcp_rtt !== undefined && net.client_tcp_rtt !== null && !isNaN(rtt);

            if (coloXY && !isNaN(cLat) && !isNaN(cLon)) {
              const distKm = Math.round(haversineKm(cLat, cLon, coloXY[0], coloXY[1]));
              const distStr = distKm < 5 ? '<5 km' : distKm + ' km';
              let line = '-> ' + coloKey.toLowerCase() + ' (~' + distStr + ')';
              if (hasRtt && rtt === 0) {
                line += ' \\u00b7 <1ms rtt (>99% of the speed of light in fiber; geo approx)';
              } else if (hasRtt && rtt > 0 && distKm >= 5) {
                const fiberSpeedKmPerMs = 299792.458 / 1.468 / 1000;
                const pct = Math.round(((2 * distKm) / rtt / fiberSpeedKmPerMs) * 100);
                if (pct > 100) {
                  line += ' \\u00b7 ' + rtt + 'ms rtt (>99% of the speed of light in fiber; geo approx)';
                } else if (pct > 0) {
                  line += ' \\u00b7 ' + rtt + 'ms rtt (~' + pct + '% of the speed of light in fiber)';
                }
              } else if (hasRtt && rtt > 0) {
                line += ' \\u00b7 ' + rtt + 'ms rtt';
              }
              parts.push(line);
            } else if (coloKey && hasRtt) {
              parts.push('-> ' + coloKey.toLowerCase() + ' \\u00b7 ' + (rtt === 0 ? '<1' : rtt) + 'ms rtt');
            }
            lines.push(parts.join(' '));

            const tlsBits = [];
            if (net.tls_cipher) tlsBits.push('cipher: ' + String(net.tls_cipher).toLowerCase());
            if (trace.kex) tlsBits.push('kex: ' + String(trace.kex).toLowerCase());
            if (trace.sni) tlsBits.push('sni: ' + String(trace.sni).toLowerCase());
            if (trace.warp) tlsBits.push('warp: ' + String(trace.warp).toLowerCase());
            if (tlsBits.length) lines.push(tlsBits.join(' \\u00b7 '));

            const timingBits = [];
            const nav = performance.getEntriesByType('navigation')[0];
            if (nav) {
              const dnsMs = Math.max(0, Math.round(nav.domainLookupEnd - nav.domainLookupStart));
              const connMs = Math.max(0, Math.round(nav.connectEnd - nav.connectStart));
              const ttfbMs = Math.max(0, Math.round(nav.responseStart - nav.requestStart));
              timingBits.push('dns ' + dnsMs + 'ms', 'connect ' + connMs + 'ms', 'ttfb ' + ttfbMs + 'ms');
            }
            const reqCtx = window._sd["request context"] || {};
            if (reqCtx.worker_execution_time_ms !== undefined) {
              timingBits.push('worker ' + reqCtx.worker_execution_time_ms + 'ms cpu');
            }
            timingBits.push('dom ' + getDomByteLength().toLocaleString() + ' bytes');
            lines.push(timingBits.join(' \\u00b7 '));

            bodyEl.textContent = lines.join('\\n');
          });
        }

        const triviaEl = document.getElementById('trivia-details');
        const triviaBody = document.getElementById('trivia-body');
        if (triviaEl && triviaBody) {
          triviaEl.addEventListener('toggle', async () => {
            if (!triviaEl.open) return;
            const dpr = window.devicePixelRatio || 1;
            const vpPx = Math.round(window.innerWidth * dpr) * Math.round(window.innerHeight * dpr);
            const vpMp = (vpPx / 1e6).toFixed(1);
            const fullPx = Math.round(document.documentElement.scrollWidth * dpr) * Math.round(document.documentElement.scrollHeight * dpr);
            const gamut = window.matchMedia('(color-gamut: p3)').matches ? 'p3 wide' : (window.matchMedia('(color-gamut: srgb)').matches ? 'srgb' : 'standard');
            const osTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            const pageTheme = (document.body.className || 'default').replace('theme-', '');

            const text = (document.body.innerText || '').trim();
            const words = text ? text.split(/\\s+/).length : 0;
            const htmlBytes = getDomByteLength();
            const textBytes = typeof TextEncoder === 'function' ? new TextEncoder().encode(text).length : text.length;
            const domNodes = document.getElementsByTagName('*').length;
            const links = document.links.length;

            const hw = [];
            if (navigator.hardwareConcurrency) hw.push(navigator.hardwareConcurrency + ' cores');
            if (navigator.deviceMemory) hw.push(navigator.deviceMemory + ' gb ram');
            hw.push('history depth: ' + window.history.length);
            const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (localTz) {
              const tzMatch = (edge.timezone && localTz === edge.timezone) ? ' (matches edge)' : '';
              hw.push('tz: ' + localTz.toLowerCase() + tzMatch);
            }

            const nav = performance.getEntriesByType('navigation')[0];
            if (nav && nav.serverTiming) {
              const st = nav.serverTiming.find(t => t.name === 'edge-now');
              if (st && st.duration > 0) {
                const clientMidMs = performance.timeOrigin + (nav.requestStart + nav.responseStart) / 2;
                const skewMs = Math.round(clientMidMs - st.duration);
                if (Math.abs(skewMs) <= 1) {
                  hw.push('clock: synced within 1ms of cloudflare edge');
                } else {
                  hw.push('clock: ~' + Math.abs(skewMs) + 'ms ' + (skewMs > 0 ? 'ahead of' : 'behind') + ' cloudflare edge');
                }
              }
            }

            let shaLine = null;
            if (window.crypto && window.crypto.subtle) {
              try {
                const buf = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(document.documentElement.outerHTML));
                const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
                shaLine = 'dom sha-256: ' + hex.slice(0, 16) + '...';
              } catch (e) {}
            }

            const tLines = [
              'viewport: ' + vpPx.toLocaleString() + ' physical pixels (~' + vpMp + ' mp @ ' + dpr + 'x dpr) \\u00b7 unrolled page: ' + fullPx.toLocaleString() + ' px',
              'display: ' + screen.colorDepth + '-bit \\u00b7 ' + gamut + ' gamut \\u00b7 os prefers ' + osTheme + ', viewing ' + pageTheme,
              'document: ' + words.toLocaleString() + ' words \\u00b7 ' + links + ' links \\u00b7 ' + domNodes + ' dom nodes \\u00b7 ' + (htmlBytes / 1024).toFixed(1) + ' kb html -> ' + (textBytes / 1024).toFixed(1) + ' kb text',
              hw.join(' \\u00b7 ')
            ];
            if (shaLine) tLines.push(shaLine);
            triviaBody.textContent = tLines.join('\\n');
          });
        }
      })();
      let _k = [];
      const runDiag = async () => {
${DIAGNOSTICS_BODY}
      };
      window.addEventListener('keydown', e => {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const t = e.target;
        if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
        if (window._diagActive) {
          if (e.key === 'Escape' && typeof window._restoreResume === 'function') {
            window._restoreResume(e);
          }
          return;
        }
        _k.push(e.key);
        if (_k.length > 4) _k.shift();
        if (_k.join('') === 'sudo') {
          _k = [];
          runDiag();
        }
      });
      const mountSudoTrigger = () => {
        if (document.getElementById('sudo-trigger')) return;
        const btn = document.createElement('button');
        btn.id = 'sudo-trigger';
        btn.type = 'button';
        btn.className = 'sudo-trigger';
        btn.textContent = 'sudo';
        btn.addEventListener('click', runDiag);
        document.body.appendChild(btn);
      };
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mountSudoTrigger);
      } else {
        mountSudoTrigger();
      }
    </script>`;
}

export function buildSudoDocument(safeDataJson: string, nonce: string): string {
	const safeNonce = escapeHtml(nonce);
	return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>sudo | jordan lenchitz</title></head><body><script nonce="${safeNonce}">window._sd = ${safeDataJson}; window._authMode = true; const runSudo = async () => { ${DIAGNOSTICS_BODY} }; if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', runSudo); } else { runSudo(); }</script></body></html>`;
}
