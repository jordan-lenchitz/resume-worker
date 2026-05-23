import {
	env,
	createExecutionContext,
	waitOnExecutionContext,
	SELF,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
import worker from "../src/index";

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe("Hello World worker", () => {
	it("responds with Hello World! (unit style)", async () => {
		const request = new IncomingRequest("http://example.com");
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		expect(await response.text()).toMatchInlineSnapshot(`
			"<!DOCTYPE html>
			<html lang="en">
			<head>
			  <meta charset="UTF-8">
			  <meta name="viewport" content="width=device-width, initial-scale=1.0">
			  <title>resume | jordan lenchitz</title>
			  <style>
			    :root {
			      --bg-color: #fdfdfd;
			      --text-color: #333;
			      --heading-color: #111;
			      --link-color: #0055cc;
			      --blockquote-color: #555;
			      --blockquote-border: #ccc;
			    }
			    body {
			      font-family: sans-serif;
			      max-width: 800px;
			      margin: 40px auto;
			      padding: 0 20px;
			      line-height: 1.6;
			      color: var(--text-color);
			      background-color: var(--bg-color);
			      transition: all 0.3s ease;
			    }
			    body.theme-dark { --bg-color: #000; --text-color: #fff; --heading-color: #fff; --link-color: #66b3ff; --blockquote-color: #ddd; --blockquote-border: #777; }
			    body.theme-violet { --bg-color: #9400D3; --text-color: #fff; --heading-color: #fff; --link-color: #e0b0ff; --blockquote-color: #ddd; --blockquote-border: #da70d6; }
			    body.theme-indigo { --bg-color: #4B0082; --text-color: #fff; --heading-color: #fff; --link-color: #b19cd9; --blockquote-color: #ddd; --blockquote-border: #8a2be2; }
			    body.theme-blue { --bg-color: #0000FF; --text-color: #fff; --heading-color: #fff; --link-color: #add8e6; --blockquote-color: #ddd; --blockquote-border: #4169e1; }
			    body.theme-green { --bg-color: #008000; --text-color: #fff; --heading-color: #fff; --link-color: #90ee90; --blockquote-color: #ddd; --blockquote-border: #32cd32; }
			    body.theme-yellow { --bg-color: #FFFF00; --text-color: #000; --heading-color: #000; --link-color: #0000cd; --blockquote-color: #222; --blockquote-border: #b8860b; }
			    body.theme-orange { --bg-color: #FFA500; --text-color: #000; --heading-color: #000; --link-color: #8b0000; --blockquote-color: #222; --blockquote-border: #ff4500; }
			    body.theme-red { --bg-color: #FF0000; --text-color: #fff; --heading-color: #fff; --link-color: #ffb6c1; --blockquote-color: #ddd; --blockquote-border: #dc143c; }

			    h2, h3 { color: var(--heading-color); margin-top: 2em; }
			    h2 a { color: var(--heading-color); text-decoration: underline; }
			    h2 a:hover { color: var(--link-color); }
			    a { color: var(--link-color); text-decoration: none; }
			    a:hover { text-decoration: underline; }
			    blockquote {
			      border-left: 3px solid var(--blockquote-border);
			      margin: 10px 0 10px 15px;
			      padding-left: 15px;
			      color: var(--blockquote-color);
			    }
			    ul { padding-left: 20px; }
			    #theme-buttons { margin-bottom: 20px; display: flex; gap: 8px; flex-wrap: wrap; }
			    #theme-buttons button { cursor: pointer; padding: 6px 12px; border: 1px solid currentColor; background: transparent; color: inherit; font-family: inherit; border-radius: 4px; }
			    #theme-buttons button:hover { opacity: 0.7; }
			  </style>
			</head>
			<body>

			  <div id="theme-buttons">
			    <button onclick="document.body.className=''">default</button>
			    <button onclick="document.body.className='theme-dark'">dark</button>
			    <button onclick="document.body.className='theme-violet'">violet</button>
			    <button onclick="document.body.className='theme-indigo'">indigo</button>
			    <button onclick="document.body.className='theme-blue'">blue</button>
			    <button onclick="document.body.className='theme-green'">green</button>
			    <button onclick="document.body.className='theme-yellow'">yellow</button>
			    <button onclick="document.body.className='theme-orange'">orange</button>
			    <button onclick="document.body.className='theme-red'">red</button>
			  </div>

			  <h2><a href="https://youtube.com/@jordan-lenchitz/videos">jordan</a> <a href="https://scholar.google.com/citations?user=pDsbnHcAAAAJ&hl=en">lenchitz</a></h2>
			  <h3>systems engineer <a href="https://github.com/jordan-lenchitz/resume-worker">and</a> experimental artist</h3>

			  <h3>likes:</h3>
			  <ul>
			    <li>hard problems</li>
			    <li>free and open-source software</li>
			    <li>the <a href="https://en.wikipedia.org/wiki/Ben_Johnston_(composer)#Recordings">string quartets of ben johnston</a></li>
			  </ul>

			  <h2>experience</h2>

			  <p><strong><a href="https://central.mychart.org">site</a> reliability engineer</strong> &middot; epic systems's epic hosting &middot; june 2023 to may 2026</p>
			  <blockquote>my primary job from 2024 onward was ensuring 100% single sign-on (SSO) uptime for mychart central. i architected <a href="https://www.intersystems.com/news/intersystems-iris-data-platform-adopted-by-epic-for-its-new-generation-of-high-performance-scalability-and-architecture-flexibility/">intersystems iris</a> backends both on-prem and in public cloud, built and maintained unique <a href="https://datatracker.ietf.org/doc/html/rfc8446">tls 1.3</a> infrastructure for SOC 2 compliance, troubleshooted an etl modernization project moving from on-prem nightly to <a href="https://rsmus.com/insights/services/digital-transformation/epics-shift-to-microsoft-fabric-data-analytics.html">cogito cloud</a> (epic's realtime analytics product leveraging microsoft fabric and snowflake), and helped improve cross-team server observability leveraging <a href="https://grafana.com/">Grafana</a> on <a href="https://www.openstack.org/">Openstack</a> (and <a href="https://prometheus.io/">Prometheus</a> for good measure) </blockquote>
			  <blockquote>beyond mychart central i supported the backend for the epic instances of dozens of healthcare organizations in the UK Canada and United States. i also had the honor of working with <a href="https://www.fisglobal.com/">FIS</a> on their <a href="https://sourceforge.net/projects/fis-gtm/">open-source GT.M ("Greystone Technology MUMPS")</a>. if you love free and open-source software check out this cool release note i validated <a href="https://fis-gtm.sourceforge.io/releasenotes/GTM_V7.1-009_Release_Notes.html#id29">(GTM-10833)</a>; if you think you do not love free and open-source software go read GT.M's <a href="https://web.archive.org/web/20001209123800/http://linuxpr.com/releases/2859.html">original gnu/linux open source press release</a> and then you will :)</blockquote>

			  <p><strong>volunteer manager</strong> &middot; society for minimalist music &middot; may 2022 to may 2026</p>
			  <blockquote>managed the web presence, digital archives, and server infrastructure for the society for minimalist music. this mostly involved running a tiny digital ocean droplet that had an nginx reverse proxy to a node backend with a sqlite db that would occasionally receive a PR from someone proposing a change to the CSS or a typo fix in a blog post about steve reich's clapping music. i also helped migrate from legacy to squarespace and paypal integration for membership dues and donations</blockquote>

			  <p><strong>adjunct assistant professor of music</strong> &middot; university of florida &middot; january to may 2023</p>
			  <blockquote>MUT 6617 (see <a href="https://digitalworlds.ufl.edu/syllabi/2021/Summer/2021-Summer-MUT%206617%20-%20Approaches%20to%20Theoretical%20Analysis-196819.pdf">my friend Jennifer's syllabus</a> for my model) online for master's students: music theory/composition/analysis with an emphasis on practical applications to the field of music education</blockquote>

			  <p><strong>legacy fellowship</strong> &middot; florida state university &middot; august 2018 to may 2023</p>
			  <blockquote>five-year teaching position <a href="https://gradschool.fsu.edu/funding-awards/graduate-school-fellowships-and-grants/fellowships-offered-by-the-graduate-school-0">awarded ~10/year on a university-wide basis</a></blockquote>
			  <blockquote>taught written music theory as well as aural and keyboard skills to music majors and minors, taught upper-division music theory electives, taught introductory songwriting course to non-music majors, and advised students on 18th-, 19th-, and 20th-century model composition projects</blockquote>

			<p><strong>distance learning architect</strong> &middot; florida state university &middot; july to december 2020</p>
			  <blockquote>optimized assessments for remote teaching due to the SARS-COV-2 pandemic, created instructional media to facilitate asynchronous learning outside of synchronous class meetings, and designed and prepared multi-section <a href="https://www.instructure.com/canvas">Canvas LMS</a> sites for a two-semester 150-student course sequence</blockquote>

			  <p><strong>recitation instructor in mathematics</strong> &middot; indiana university &middot; january 2015 to may 2018</p>
			  <blockquote>lead group problem-solving and review sessions for 10-15 calculus, finite mathematics, and college algebra students at a time. my favorite part was working with <a href="https://studentlife.indiana.edu/involvement-belonging/groups-scholars/admitted-students.html">first-generation college students in summer sessions</a> to prepare them for starting college mathematics in the fall</blockquote>

			  <h2>education</h2>

			  <p><strong>florida state university (2027)</strong></p>
			  <blockquote>doctor of philosophy in music theory and composition with an emphasis on music cognition, computational music cognition, and the musicals of stephen sondheim</blockquote>
			  <p><a href="https://github.com/jordan-lenchitz/listening">dissertation</a> = listening to <em>a cappella</em> singing: an ecological approach</p>

			  <p><strong>indiana university bloomington (2018)</strong></p>
			  <blockquote>bachelor of arts in french with highest distinction</blockquote>
			  <blockquote>bachelor of arts in mathematics with highest distinction and honors in mathemitics</blockquote>
			  <blockquote>bachelor of music in music composition and piano performance with high distinction and honors in music</blockquote>

			  <h2>references and esoteric trivia available upon request</h2>

			  <h2>contact</h2>
			  <p><a href="mailto:sudo@jordanlenchitz.org">sudo@jordanlenchitz.org</a></p>

			  <hr>
			  <p>digitally signed &middot; x.509 v3 &middot; pkcs #7 detached signature</p>
			  <pre style="font-family: inherit; overflow-x: auto;">
			-----begin x.509 signature block-----
			signed by : c=us, o=self-signed individual, ou=jordan-lenchitz, cn=jordan lenchitz
			issued by : c=us, o=self-signed individual, ou=jordan-lenchitz, cn=jordan lenchitz
			[self-signed, no certificate authority was harmed in the making of this resume]
			version : 3 (0x2)
			serial number : 30:51:e8:2b:2b:d2:ba:df:cb:ff:5f:4d:7d:53:f6:0b:d3:39:8b:6a
			signature alg : sha256withrsaencryption (1.2.840.113549.1.1.11)
			public key : rsa 4096-bit, exponent 65537 (0x10001)
			validity : not before 2026-04-18 11:36:14 utc
			not after 2027-04-18 11:36:14 utc
			key usage : digital signature, non-repudiation (critical)
			ext. key usage : e-mail protection, tls client authentication
			subject alt name : email:available@uponrequest.example
			basic constraint : ca:false
			fingerprint sha-1 : 55:74:99:07:1e:9d:b0:f2:5d:35:af:30:76:ed:df:28:96:64:16:4d
			fingerprint sha-256: 69:1c:9f:b7:57:ca:c5:09:81:a7:b2:3c:42:00:59
			85:aa:c7:e9:63:c1:61:8e:97:9d:7e:76:cf:2e:2d:d9:41
			negotiated cipher: tls_aes_256_gcm_sha384 (hypothetically)
			protocol version : tls 1.3 (hypothetically)
			timestamp : 2027-07-07t07:07:07z
			trust chain : untrusted, root not present in any known trust store
			verify status : cryptographically valid, socially meaningless
			-----end x.509 signature block-----
			  </pre>

			  <p id="ip-display" style="text-align: center; margin-top: 30px;">
			    client ipv6: loading... &middot; client ipv4: loading... &middot; gcp dns: 8.8.8.8
			  </p>
			  <script>
			    const getIp = url => fetch(url).then(r => r.ok ? r.text() : Promise.reject()).then(t => t.trim()).catch(() => null);
			    Promise.all([getIp('https://ipv6.icanhazip.com'), getIp('https://ipv4.icanhazip.com')]).then(([v6, v4]) => {
			      let out = [];
			      if (v6) out.push('client ipv6: ' + v6);
			      if (v4) out.push('client ipv4: ' + v4);
			      if (!v6 && !v4) out.push('client ipv6: unknown', 'client ipv4: unknown (fetch failed)');
			      out.push('gcp dns: 8.8.8.8');
			      document.getElementById('ip-display').innerHTML = out.join(' &middot; ');
			    });
			  </script>
			<script>
			      window._sd = {"edge metadata":{"colo":"UNKNOWN","is_eu_country":false},"tls & network":{"ip":"UNKNOWN"},"threat intelligence":{"bot_management_score":"unknown","verified_bot":false,"client_trust_score":"unknown","corporate_proxy":false,"is_tor":false,"threat_tier":"low"},"request context":{"method":"GET","url":"http://example.com/","ray_id":null,"cache_status":"MISS","worker_execution_time_ms":0,"headers":{}}};
			      window._authMode = false;
			      let _k = [];
			      const runDiag = async () => {
			        
			      let cd = { 
			        "browser identity": {}, "hardware & gpu": {}, "screen & window": {}, 
			        "network & power": {}, "preferences & accessibility": {}, 
			        "performance & DOM": {}, "multimedia & permissions": {} 
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
			        try { const ac = new (window.AudioContext || window.webkitAudioContext)(); ac_sample_rate = ac.sampleRate; ac_state = ac.state; } catch(e){}
			        
			        cd["multimedia & permissions"] = {
			          audio_sample_rate: ac_sample_rate,
			          audio_context_state: ac_state,
			          permissions: {}
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

			      const p = {
			        STATUS: window._authMode ? "DEEP_DIAGNOSTICS_MAXIMALIST (MOBILE_AUTH)" : "DEEP_DIAGNOSTICS_MAXIMALIST",
			        TIMESTAMP: new Date().toISOString(),
			        "SERVER TELEMETRY": window._sd,
			        "CLIENT TELEMETRY": cd
			      };
			      document.body.className = '';
			      document.body.innerHTML = '<div style="background:#050505;color:#00ff41;padding:2rem;font-family:\\'JetBrains Mono\\',monospace;min-height:100vh;margin:0;box-sizing:border-box;"><h2 style="color:#00ff41;margin-top:0;text-shadow:0 0 5px #00ff41;word-break:break-all;">[// MAXIMALIST_TELEMETRY_AUTHORIZED //]</h2><pre style="white-space:pre-wrap;word-wrap:break-word;font-size:12px;line-height:1.4;overflow-x:hidden;">' + JSON.stringify(p, null, 2) + '</pre><div style="margin-top:20px;animation:blink 1s infinite;">_</div></div><style>body{margin:0;padding:0;background:#050505;}@keyframes blink { 0% {opacity:1;} 50% {opacity:0;} 100% {opacity:1;} }</style>';
			    
			      };
			      window.addEventListener('keydown', e => {
			        _k.push(e.key);
			        if (_k.length > 4) _k.shift();
			        if (_k.join('') === 'sudo') {
			          runDiag();
			        }
			      });
			      document.addEventListener('DOMContentLoaded', () => {
			        const btn = document.createElement('button');
			        btn.innerText = 'sudo';
			        btn.style.cssText = 'position:fixed;bottom:5px;right:5px;opacity:0.1;font-size:10px;background:transparent;border:none;cursor:pointer;';
			        btn.onclick = runDiag;
			        document.body.appendChild(btn);
			      });
			    </script>
			</body>
			</html>"
		`);
	});

	it("responds with Hello World! (integration style)", async () => {
		const response = await SELF.fetch("https://example.com");
		expect(await response.text()).toMatchInlineSnapshot(`
			"<!DOCTYPE html>
			<html lang="en">
			<head>
			  <meta charset="UTF-8">
			  <meta name="viewport" content="width=device-width, initial-scale=1.0">
			  <title>resume | jordan lenchitz</title>
			  <style>
			    :root {
			      --bg-color: #fdfdfd;
			      --text-color: #333;
			      --heading-color: #111;
			      --link-color: #0055cc;
			      --blockquote-color: #555;
			      --blockquote-border: #ccc;
			    }
			    body {
			      font-family: sans-serif;
			      max-width: 800px;
			      margin: 40px auto;
			      padding: 0 20px;
			      line-height: 1.6;
			      color: var(--text-color);
			      background-color: var(--bg-color);
			      transition: all 0.3s ease;
			    }
			    body.theme-dark { --bg-color: #000; --text-color: #fff; --heading-color: #fff; --link-color: #66b3ff; --blockquote-color: #ddd; --blockquote-border: #777; }
			    body.theme-violet { --bg-color: #9400D3; --text-color: #fff; --heading-color: #fff; --link-color: #e0b0ff; --blockquote-color: #ddd; --blockquote-border: #da70d6; }
			    body.theme-indigo { --bg-color: #4B0082; --text-color: #fff; --heading-color: #fff; --link-color: #b19cd9; --blockquote-color: #ddd; --blockquote-border: #8a2be2; }
			    body.theme-blue { --bg-color: #0000FF; --text-color: #fff; --heading-color: #fff; --link-color: #add8e6; --blockquote-color: #ddd; --blockquote-border: #4169e1; }
			    body.theme-green { --bg-color: #008000; --text-color: #fff; --heading-color: #fff; --link-color: #90ee90; --blockquote-color: #ddd; --blockquote-border: #32cd32; }
			    body.theme-yellow { --bg-color: #FFFF00; --text-color: #000; --heading-color: #000; --link-color: #0000cd; --blockquote-color: #222; --blockquote-border: #b8860b; }
			    body.theme-orange { --bg-color: #FFA500; --text-color: #000; --heading-color: #000; --link-color: #8b0000; --blockquote-color: #222; --blockquote-border: #ff4500; }
			    body.theme-red { --bg-color: #FF0000; --text-color: #fff; --heading-color: #fff; --link-color: #ffb6c1; --blockquote-color: #ddd; --blockquote-border: #dc143c; }

			    h2, h3 { color: var(--heading-color); margin-top: 2em; }
			    h2 a { color: var(--heading-color); text-decoration: underline; }
			    h2 a:hover { color: var(--link-color); }
			    a { color: var(--link-color); text-decoration: none; }
			    a:hover { text-decoration: underline; }
			    blockquote {
			      border-left: 3px solid var(--blockquote-border);
			      margin: 10px 0 10px 15px;
			      padding-left: 15px;
			      color: var(--blockquote-color);
			    }
			    ul { padding-left: 20px; }
			    #theme-buttons { margin-bottom: 20px; display: flex; gap: 8px; flex-wrap: wrap; }
			    #theme-buttons button { cursor: pointer; padding: 6px 12px; border: 1px solid currentColor; background: transparent; color: inherit; font-family: inherit; border-radius: 4px; }
			    #theme-buttons button:hover { opacity: 0.7; }
			  </style>
			</head>
			<body>

			  <div id="theme-buttons">
			    <button onclick="document.body.className=''">default</button>
			    <button onclick="document.body.className='theme-dark'">dark</button>
			    <button onclick="document.body.className='theme-violet'">violet</button>
			    <button onclick="document.body.className='theme-indigo'">indigo</button>
			    <button onclick="document.body.className='theme-blue'">blue</button>
			    <button onclick="document.body.className='theme-green'">green</button>
			    <button onclick="document.body.className='theme-yellow'">yellow</button>
			    <button onclick="document.body.className='theme-orange'">orange</button>
			    <button onclick="document.body.className='theme-red'">red</button>
			  </div>

			  <h2><a href="https://youtube.com/@jordan-lenchitz/videos">jordan</a> <a href="https://scholar.google.com/citations?user=pDsbnHcAAAAJ&hl=en">lenchitz</a></h2>
			  <h3>systems engineer <a href="https://github.com/jordan-lenchitz/resume-worker">and</a> experimental artist</h3>

			  <h3>likes:</h3>
			  <ul>
			    <li>hard problems</li>
			    <li>free and open-source software</li>
			    <li>the <a href="https://en.wikipedia.org/wiki/Ben_Johnston_(composer)#Recordings">string quartets of ben johnston</a></li>
			  </ul>

			  <h2>experience</h2>

			  <p><strong><a href="https://central.mychart.org">site</a> reliability engineer</strong> &middot; epic systems's epic hosting &middot; june 2023 to may 2026</p>
			  <blockquote>my primary job from 2024 onward was ensuring 100% single sign-on (SSO) uptime for mychart central. i architected <a href="https://www.intersystems.com/news/intersystems-iris-data-platform-adopted-by-epic-for-its-new-generation-of-high-performance-scalability-and-architecture-flexibility/">intersystems iris</a> backends both on-prem and in public cloud, built and maintained unique <a href="https://datatracker.ietf.org/doc/html/rfc8446">tls 1.3</a> infrastructure for SOC 2 compliance, troubleshooted an etl modernization project moving from on-prem nightly to <a href="https://rsmus.com/insights/services/digital-transformation/epics-shift-to-microsoft-fabric-data-analytics.html">cogito cloud</a> (epic's realtime analytics product leveraging microsoft fabric and snowflake), and helped improve cross-team server observability leveraging <a href="https://grafana.com/">Grafana</a> on <a href="https://www.openstack.org/">Openstack</a> (and <a href="https://prometheus.io/">Prometheus</a> for good measure) </blockquote>
			  <blockquote>beyond mychart central i supported the backend for the epic instances of dozens of healthcare organizations in the UK Canada and United States. i also had the honor of working with <a href="https://www.fisglobal.com/">FIS</a> on their <a href="https://sourceforge.net/projects/fis-gtm/">open-source GT.M ("Greystone Technology MUMPS")</a>. if you love free and open-source software check out this cool release note i validated <a href="https://fis-gtm.sourceforge.io/releasenotes/GTM_V7.1-009_Release_Notes.html#id29">(GTM-10833)</a>; if you think you do not love free and open-source software go read GT.M's <a href="https://web.archive.org/web/20001209123800/http://linuxpr.com/releases/2859.html">original gnu/linux open source press release</a> and then you will :)</blockquote>

			  <p><strong>volunteer manager</strong> &middot; society for minimalist music &middot; may 2022 to may 2026</p>
			  <blockquote>managed the web presence, digital archives, and server infrastructure for the society for minimalist music. this mostly involved running a tiny digital ocean droplet that had an nginx reverse proxy to a node backend with a sqlite db that would occasionally receive a PR from someone proposing a change to the CSS or a typo fix in a blog post about steve reich's clapping music. i also helped migrate from legacy to squarespace and paypal integration for membership dues and donations</blockquote>

			  <p><strong>adjunct assistant professor of music</strong> &middot; university of florida &middot; january to may 2023</p>
			  <blockquote>MUT 6617 (see <a href="https://digitalworlds.ufl.edu/syllabi/2021/Summer/2021-Summer-MUT%206617%20-%20Approaches%20to%20Theoretical%20Analysis-196819.pdf">my friend Jennifer's syllabus</a> for my model) online for master's students: music theory/composition/analysis with an emphasis on practical applications to the field of music education</blockquote>

			  <p><strong>legacy fellowship</strong> &middot; florida state university &middot; august 2018 to may 2023</p>
			  <blockquote>five-year teaching position <a href="https://gradschool.fsu.edu/funding-awards/graduate-school-fellowships-and-grants/fellowships-offered-by-the-graduate-school-0">awarded ~10/year on a university-wide basis</a></blockquote>
			  <blockquote>taught written music theory as well as aural and keyboard skills to music majors and minors, taught upper-division music theory electives, taught introductory songwriting course to non-music majors, and advised students on 18th-, 19th-, and 20th-century model composition projects</blockquote>

			<p><strong>distance learning architect</strong> &middot; florida state university &middot; july to december 2020</p>
			  <blockquote>optimized assessments for remote teaching due to the SARS-COV-2 pandemic, created instructional media to facilitate asynchronous learning outside of synchronous class meetings, and designed and prepared multi-section <a href="https://www.instructure.com/canvas">Canvas LMS</a> sites for a two-semester 150-student course sequence</blockquote>

			  <p><strong>recitation instructor in mathematics</strong> &middot; indiana university &middot; january 2015 to may 2018</p>
			  <blockquote>lead group problem-solving and review sessions for 10-15 calculus, finite mathematics, and college algebra students at a time. my favorite part was working with <a href="https://studentlife.indiana.edu/involvement-belonging/groups-scholars/admitted-students.html">first-generation college students in summer sessions</a> to prepare them for starting college mathematics in the fall</blockquote>

			  <h2>education</h2>

			  <p><strong>florida state university (2027)</strong></p>
			  <blockquote>doctor of philosophy in music theory and composition with an emphasis on music cognition, computational music cognition, and the musicals of stephen sondheim</blockquote>
			  <p><a href="https://github.com/jordan-lenchitz/listening">dissertation</a> = listening to <em>a cappella</em> singing: an ecological approach</p>

			  <p><strong>indiana university bloomington (2018)</strong></p>
			  <blockquote>bachelor of arts in french with highest distinction</blockquote>
			  <blockquote>bachelor of arts in mathematics with highest distinction and honors in mathemitics</blockquote>
			  <blockquote>bachelor of music in music composition and piano performance with high distinction and honors in music</blockquote>

			  <h2>references and esoteric trivia available upon request</h2>

			  <h2>contact</h2>
			  <p><a href="mailto:sudo@jordanlenchitz.org">sudo@jordanlenchitz.org</a></p>

			  <hr>
			  <p>digitally signed &middot; x.509 v3 &middot; pkcs #7 detached signature</p>
			  <pre style="font-family: inherit; overflow-x: auto;">
			-----begin x.509 signature block-----
			signed by : c=us, o=self-signed individual, ou=jordan-lenchitz, cn=jordan lenchitz
			issued by : c=us, o=self-signed individual, ou=jordan-lenchitz, cn=jordan lenchitz
			[self-signed, no certificate authority was harmed in the making of this resume]
			version : 3 (0x2)
			serial number : 30:51:e8:2b:2b:d2:ba:df:cb:ff:5f:4d:7d:53:f6:0b:d3:39:8b:6a
			signature alg : sha256withrsaencryption (1.2.840.113549.1.1.11)
			public key : rsa 4096-bit, exponent 65537 (0x10001)
			validity : not before 2026-04-18 11:36:14 utc
			not after 2027-04-18 11:36:14 utc
			key usage : digital signature, non-repudiation (critical)
			ext. key usage : e-mail protection, tls client authentication
			subject alt name : email:available@uponrequest.example
			basic constraint : ca:false
			fingerprint sha-1 : 55:74:99:07:1e:9d:b0:f2:5d:35:af:30:76:ed:df:28:96:64:16:4d
			fingerprint sha-256: 69:1c:9f:b7:57:ca:c5:09:81:a7:b2:3c:42:00:59
			85:aa:c7:e9:63:c1:61:8e:97:9d:7e:76:cf:2e:2d:d9:41
			negotiated cipher: tls_aes_256_gcm_sha384 (hypothetically)
			protocol version : tls 1.3 (hypothetically)
			timestamp : 2027-07-07t07:07:07z
			trust chain : untrusted, root not present in any known trust store
			verify status : cryptographically valid, socially meaningless
			-----end x.509 signature block-----
			  </pre>

			  <p id="ip-display" style="text-align: center; margin-top: 30px;">
			    client ipv6: loading... &middot; client ipv4: loading... &middot; gcp dns: 8.8.8.8
			  </p>
			  <script>
			    const getIp = url => fetch(url).then(r => r.ok ? r.text() : Promise.reject()).then(t => t.trim()).catch(() => null);
			    Promise.all([getIp('https://ipv6.icanhazip.com'), getIp('https://ipv4.icanhazip.com')]).then(([v6, v4]) => {
			      let out = [];
			      if (v6) out.push('client ipv6: ' + v6);
			      if (v4) out.push('client ipv4: ' + v4);
			      if (!v6 && !v4) out.push('client ipv6: unknown', 'client ipv4: unknown (fetch failed)');
			      out.push('gcp dns: 8.8.8.8');
			      document.getElementById('ip-display').innerHTML = out.join(' &middot; ');
			    });
			  </script>
			<script>
			      window._sd = {"edge metadata":{"colo":"UNKNOWN","is_eu_country":false},"tls & network":{"ip":"UNKNOWN"},"threat intelligence":{"bot_management_score":"unknown","verified_bot":false,"client_trust_score":"unknown","corporate_proxy":false,"is_tor":false,"threat_tier":"low"},"request context":{"method":"GET","url":"https://example.com/","ray_id":null,"cache_status":"MISS","worker_execution_time_ms":0,"headers":{}}};
			      window._authMode = false;
			      let _k = [];
			      const runDiag = async () => {
			        
			      let cd = { 
			        "browser identity": {}, "hardware & gpu": {}, "screen & window": {}, 
			        "network & power": {}, "preferences & accessibility": {}, 
			        "performance & DOM": {}, "multimedia & permissions": {} 
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
			        try { const ac = new (window.AudioContext || window.webkitAudioContext)(); ac_sample_rate = ac.sampleRate; ac_state = ac.state; } catch(e){}
			        
			        cd["multimedia & permissions"] = {
			          audio_sample_rate: ac_sample_rate,
			          audio_context_state: ac_state,
			          permissions: {}
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

			      const p = {
			        STATUS: window._authMode ? "DEEP_DIAGNOSTICS_MAXIMALIST (MOBILE_AUTH)" : "DEEP_DIAGNOSTICS_MAXIMALIST",
			        TIMESTAMP: new Date().toISOString(),
			        "SERVER TELEMETRY": window._sd,
			        "CLIENT TELEMETRY": cd
			      };
			      document.body.className = '';
			      document.body.innerHTML = '<div style="background:#050505;color:#00ff41;padding:2rem;font-family:\\'JetBrains Mono\\',monospace;min-height:100vh;margin:0;box-sizing:border-box;"><h2 style="color:#00ff41;margin-top:0;text-shadow:0 0 5px #00ff41;word-break:break-all;">[// MAXIMALIST_TELEMETRY_AUTHORIZED //]</h2><pre style="white-space:pre-wrap;word-wrap:break-word;font-size:12px;line-height:1.4;overflow-x:hidden;">' + JSON.stringify(p, null, 2) + '</pre><div style="margin-top:20px;animation:blink 1s infinite;">_</div></div><style>body{margin:0;padding:0;background:#050505;}@keyframes blink { 0% {opacity:1;} 50% {opacity:0;} 100% {opacity:1;} }</style>';
			    
			      };
			      window.addEventListener('keydown', e => {
			        _k.push(e.key);
			        if (_k.length > 4) _k.shift();
			        if (_k.join('') === 'sudo') {
			          runDiag();
			        }
			      });
			      document.addEventListener('DOMContentLoaded', () => {
			        const btn = document.createElement('button');
			        btn.innerText = 'sudo';
			        btn.style.cssText = 'position:fixed;bottom:5px;right:5px;opacity:0.1;font-size:10px;background:transparent;border:none;cursor:pointer;';
			        btn.onclick = runDiag;
			        document.body.appendChild(btn);
			      });
			    </script>
			</body>
			</html>"
		`);
	});
});
