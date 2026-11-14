const resumeHtml = `<!DOCTYPE html>
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
    body.theme-dark { --bg-color: #000; --text-color: #fff; --heading-color: #fff; --link-color: #fff; --blockquote-color: #ddd; --blockquote-border: #777; }
    body.theme-violet { --bg-color: #9400D3; --text-color: #fff; --heading-color: #fff; --link-color: #6BFF2C; --blockquote-color: #ddd; --blockquote-border: #da70d6; }
    body.theme-indigo { --bg-color: #4B0082; --text-color: #fff; --heading-color: #fff; --link-color: #B4FF7D; --blockquote-color: #ddd; --blockquote-border: #8a2be2; }
    body.theme-blue { --bg-color: #0000FF; --text-color: #fff; --heading-color: #fff; --link-color: #FF0000; --blockquote-color: #ddd; --blockquote-border: #4169e1; }
    body.theme-green { --bg-color: #008000; --text-color: #fff; --heading-color: #fff; --link-color: #FF7FFF; --blockquote-color: #ddd; --blockquote-border: #32cd32; }
    body.theme-yellow { --bg-color: #FFFF00; --text-color: #000; --heading-color: #000; --link-color: #0000FF; --blockquote-color: #222; --blockquote-border: #b8860b; }
    body.theme-orange { --bg-color: #FFA500; --text-color: #000; --heading-color: #000; --link-color: #005AFF; --blockquote-color: #222; --blockquote-border: #ff4500; }
    body.theme-red { --bg-color: #FF0000; --text-color: #fff; --heading-color: #fff; --link-color: #00FFFF; --blockquote-color: #ddd; --blockquote-border: #dc143c; }

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

  <h2><a href="https://www.youtube.com/channel/UCCYpb47d3G3TpAN-T_Zc_qg">jordan</a> <a href="https://scholar.google.com/citations?user=pDsbnHcAAAAJ&hl=en">lenchitz</a> (<a href="https://yottadb.com/yottadb-as-a-creative-platform-experimental-video-art-at-scale/">blog</a>)</h2>
  <h3>systems engineer <a href="https://github.com/jordan-lenchitz/resume-worker">and</a> experimental artist</h3>

  <h3>likes:</h3>
  <ul>
    <li>hard problems</li>
    <li>free and open-source software</li>
    <li>the <a href="https://en.wikipedia.org/wiki/Ben_Johnston_(composer)#Recordings">string quartets of ben johnston</a></li>
  </ul>

  <h2>experience</h2>

  <p><strong>site reliability engineer</strong> &middot; epic systems's epic hosting &middot; june 2023 to may 2026</p>
  <blockquote>my primary job from 2024 onward was ensuring 100% single sign-on (SSO) uptime for <a href="https://central.mychart.org">mychart central</a>. i architected <a href="https://www.intersystems.com/products/iris/">intersystems iris</a> backends both <a href="https://www.vmware.com/docs/vmw-451-why-vms-remain-a-driving-force">on-prem</a> and in <a href="https://azure.microsoft.com/">public cloud</a>, built and maintained unique <a href="https://datatracker.ietf.org/doc/html/rfc8446">tls 1.3</a> infrastructure leveraging <a href="https://dev.digicert.com/certcentral-apis/services-api.html">PKI</a>-as-<a href="https://docs.ansible.com/">code</a> for SOC 2 compliance, troubleshooted an etl modernization project moving from on-prem nightly to <a href="https://rsmus.com/insights/services/digital-transformation/epics-shift-to-microsoft-fabric-data-analytics.html">cogito cloud</a> (epic's realtime analytics product leveraging <a href="https://www.microsoft.com/en-us/microsoft-fabric">microsoft fabric</a> and <a href="https://www.snowflake.com/en/">snowflake</a>), and helped improve cross-team server observability leveraging <a href="https://grafana.com/">Grafana</a> on <a href="https://www.openstack.org/">Openstack</a> (and <a href="https://prometheus.io/">Prometheus</a> for good measure) </blockquote>
  <blockquote>beyond mychart central i supported the backend for the epic instances of dozens of healthcare organizations in the UK Canada and United States. i also had the honor of working with <a href="https://www.fisglobal.com/">FIS</a> on their <a href="https://sourceforge.net/projects/fis-gtm/">open-source GT.M ("Greystone Technology MUMPS")</a>. i spent a lot of time reading their <a href="https://fis-gtm.sourceforge.io/manuals/ao/ch09s04.html">amazing explanation of their B*-tree open-source NoSQL database structure</a>; my personal favorite $Z* function is <a href="https://fis-gtm.sourceforge.io/manuals/pg/ch07s50.html">$ZQGBLMOD</a>, which enables an application to determine whether it can safely apply a lost transaction to the database. if you love free and open-source software check out these three cool release notes i validated: <a href="https://fis-gtm.sourceforge.io/releasenotes/GTM_V7.1-009_Release_Notes.html#id29">GTM-10833</a> (more flexibility in disaster recovery operations), <a href="https://fis-gtm.sourceforge.io/releasenotes/GTM_V7.1-010_Release_Notes.html#id738">GTM-11345</a> (external calls now recognize each M transaction's atomicity consistency isolation and durability), and <a href="https://fis-gtm.sourceforge.io/releasenotes/GTM_V7.1-011_Release_Notes.html#id28">GTM-11488</a> (race condition eliminated); if you ever think you do not love free and open-source go read GT.M's <a href="https://web.archive.org/web/20001209123800/http://linuxpr.com/releases/2859.html">original gnu/linux open source press release</a> and then you will :)</blockquote>

  <p><strong>volunteer webmanager</strong> &middot; <a href="https://www.minimalismsociety.net/">society for minimalist music</a> &middot; may 2022 to may 2026</p>
  <blockquote>managed the web presence and digital archives for the society for minimalist music. this mostly involved migrating from legacy web hosting to <a href="https://www.squarespace.com/">squarespace</a> and supporting a <a href="https://www.paypal.com/">paypal</a> integration for membership dues and donations</blockquote>
  
  <p><strong>adjunct assistant professor of music</strong> &middot; <a href="https://www.ufl.edu/">university of florida</a> &middot; january to may 2023</p>
  <blockquote>MUT 6617 (see <a href="https://digitalworlds.ufl.edu/syllabi/2021/Summer/2021-Summer-MUT%206617%20-%20Approaches%20to%20Theoretical%20Analysis-196819.pdf">my friend Jennifer's syllabus</a> for my model) online for master's students: <a href="https://en.wikipedia.org/wiki/Music_theory">music theory</a>/composition/<a href="https://en.wikipedia.org/wiki/Musical_analysis">analysis</a> with an emphasis on practical applications to the field of <a href="https://en.wikipedia.org/wiki/Music_education">music education</a></blockquote>

  <p><strong>legacy fellowship</strong> &middot; <a href="https://www.fsu.edu/">florida state university</a> &middot; august 2018 to may 2023</p>
  <blockquote>five-year teaching position <a href="https://gradschool.fsu.edu/funding-awards/graduate-school-fellowships-and-grants/fellowships-offered-by-the-graduate-school-0">awarded ~10/year on a university-wide basis</a></blockquote>
  <blockquote>taught written music theory as well as aural and <a href="https://en.wikipedia.org/wiki/Keyboard_instrument">keyboard skills</a> to music majors and minors, taught upper-division music theory electives, taught introductory <a href="https://en.wikipedia.org/wiki/Songwriter">songwriting</a> course to non-music majors, and advised students on 18th-, 19th-, and 20th-century <a href="https://en.wikipedia.org/wiki/Musical_composition">model composition</a> projects</blockquote>

  <p><strong>distance learning architect</strong> &middot; <a href="https://www.fsu.edu/">florida state university</a> &middot; july to december 2020</p>
  <blockquote>optimized assessments for remote teaching due to the <a href="https://en.wikipedia.org/wiki/COVID-19_pandemic">SARS-COV-2 pandemic</a>, created instructional media to facilitate <a href="https://en.wikipedia.org/wiki/Asynchronous_learning">asynchronous learning</a> outside of <a href="https://zoom.us/">synchronous class meetings</a>, and designed and prepared multi-section <a href="https://www.instructure.com/canvas">Canvas LMS</a> sites for a two-semester 150-student course sequence</blockquote>

  <p><strong>recitation instructor in mathematics</strong> &middot; <a href="https://www.indiana.edu/">indiana university</a> &middot; january 2015 to may 2018</p>
  <blockquote>lead group problem-solving and review sessions for 10-15 <a href="https://en.wikipedia.org/wiki/Calculus">calculus</a>, <a href="https://en.wikipedia.org/wiki/Finite_mathematics">finite mathematics</a>, and <a href="https://en.wikipedia.org/wiki/Fraction">college algebra</a> students at a time. my favorite part was working with <a href="https://studentlife.indiana.edu/involvement-belonging/groups-scholars/admitted-students.html">first-generation college students in summer sessions</a> to prepare them for starting college mathematics in the fall</blockquote>

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
  <p id="path-display" style="text-align: center; margin-top: 6px; white-space: pre-line;">
    path: resolving...
  </p>
  <details id="plumbing-details" style="text-align: center; margin-top: 6px;">
    <summary style="cursor: pointer;">bgp prefix &amp; fiber path</summary>
    <p id="plumbing-body" style="margin-top: 6px; white-space: pre-line;">expand to inspect bgp prefix &amp; fiber propagation</p>
  </details>
  <details id="trivia-details" style="text-align: center; margin-top: 6px;">
    <summary style="cursor: pointer;">screen &amp; document trivia</summary>
    <p id="trivia-body" style="margin-top: 6px; white-space: pre-line;">expand to inspect pixels, prose &amp; clock skew</p>
  </details>
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
</body>
</html>`;

export interface Env {
  SUDO_AUTH_B64?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const startMs = Date.now();
    const url = new URL(request.url);
    
    const headersObj = Object.fromEntries(request.headers.entries());
    if (headersObj.authorization) headersObj.authorization = '[REDACTED]';

    const serverData = {
      "edge metadata": {
        colo: request.cf?.colo || 'UNKNOWN',
        continent: request.cf?.continent,
        country: request.cf?.country,
        region: request.cf?.region,
        city: request.cf?.city,
        latitude: request.cf?.latitude,
        longitude: request.cf?.longitude,
        postal_code: (request.cf as any)?.postalCode,
        metro_code: (request.cf as any)?.metroCode,
        timezone: request.cf?.timezone,
        is_eu_country: (request.cf as any)?.isEUCountry === '1'
      },
      "tls & network": {
        http_protocol: request.cf?.httpProtocol,
        tls_version: request.cf?.tlsVersion,
        tls_cipher: request.cf?.tlsCipher,
        client_tcp_rtt: request.cf?.clientTcpRtt,
        asn: request.cf?.asn,
        as_org: request.cf?.asOrganization,
        ip: request.headers.get('cf-connecting-ip') || 'UNKNOWN'
      },
      "threat intelligence": {
        bot_management_score: (request.cf as any)?.botManagement?.score ?? 'unknown',
        verified_bot: (request.cf as any)?.botManagement?.verifiedBot ?? false,
        client_trust_score: (request.cf as any)?.clientTrustScore ?? 'unknown',
        corporate_proxy: (request.cf as any)?.corporateProxy === '1',
        is_tor: request.cf?.country === 'T1',
        threat_tier: ((request.cf as any)?.botManagement?.score !== undefined && (request.cf as any)?.botManagement?.score < 30) ? 'high' : 'low'
      },
      "request context": {
        method: request.method,
        url: request.url,
        ray_id: request.headers.get('cf-ray'),
        cache_status: request.headers.get('cf-cache-status') || 'MISS',
        worker_execution_time_ms: 0,
        headers: headersObj
      }
    };

    serverData["request context"].worker_execution_time_ms = Date.now() - startMs;
    const safeData = JSON.stringify(serverData).replace(/</g, '\\u003c');
    
    const renderDiagnostics = `
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
        try { const ac = new (window.AudioContext || window.webkitAudioContext)(); ac_sample_rate = ac.sampleRate; ac_state = ac.state; } catch(e){}
        
        cd["multimedia & permissions"] = {
          audio_sample_rate: ac_sample_rate,
          audio_context_state: ac_state,
          permissions: {}
        };
        
        // Font Enumeration via Canvas TextMetrics
        const fctx = document.createElement("canvas").getContext("2d");
        const testString = "mmmmmmmmmmlli";
        const baseFonts = ["monospace", "sans-serif", "serif"];
        const testFonts = [
          "Arial", "Calibri", "Comic Sans MS", "Consolas", "Courier New", "Georgia", 
          "Impact", "Lucida Console", "Palatino Linotype", "Segoe UI", "Tahoma", 
          "Times New Roman", "Trebuchet MS", "Verdana", // Standard Windows
          "Helvetica Neue", "Menlo", "Monaco", "PingFang SC", "San Francisco", // Mac/Apple
          "Ubuntu", "Liberation Sans", "DejaVu Sans", "FreeSans", // Linux
          "Roboto", "Open Sans", "Lato", "Montserrat", "Oswald", // Web/Google
          "Adobe Clean", "Myriad Pro", "Minion Pro" // Creative Cloud
        ];
        
        const detected = [];
        for (let font of testFonts) {
          let found = false;
          for (let base of baseFonts) {
            fctx.font = "72px " + base;
            const baselineWidth = fctx.measureText(testString).width;
            fctx.font = "72px '" + font + "', " + base;
            const testWidth = fctx.measureText(testString).width;
            if (baselineWidth !== testWidth) {
              found = true;
              break;
            }
          }
          if (found) detected.push(font);
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
      const backAttrs = hasSaved
        ? 'role="button" tabindex="0" title="restores your original DOM from a DocumentFragment in RAM; zero packets will be sent"'
        : 'href="/" title="navigates back to /"';
      document.body.innerHTML = '<div style="background:#050505;color:#00ff41;padding:2rem;font-family:\\'JetBrains Mono\\',monospace;min-height:100vh;margin:0;box-sizing:border-box;"><h2 style="color:#00ff41;margin-top:0;text-shadow:0 0 5px #00ff41;overflow-wrap:break-word;">maximalist telemetry authorized</h2><pre style="white-space:pre-wrap;word-wrap:break-word;font-size:12px;line-height:1.4;overflow-x:hidden;">' + JSON.stringify(sortedP, null, 2) + '</pre><div style="margin-top:20px;animation:blink 1s infinite;">&#9608;</div><div style="margin-top:20px;"><a id="back-to-resume" ' + backAttrs + ' style="color:#00ff41;text-decoration:underline;font-family:inherit;font-size:12px;cursor:pointer;">&larr; back to jordan\\'s resume</a></div></div><style>body{margin:0;padding:0;background:#050505;}@keyframes blink { 0% {opacity:1;} 50% {opacity:0;} 100% {opacity:1;} }</style>';
      const backLink = document.getElementById('back-to-resume');
      if (backLink && window._savedFragment) {
        const restoreResume = (e) => {
          e.preventDefault();
          document.body.innerHTML = '';
          document.body.className = window._savedBodyClass || '';
          document.body.appendChild(window._savedFragment);
          window._savedFragment = null;
          window.scrollTo(0, 0);
        };
        backLink.addEventListener('click', restoreResume);
        backLink.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') restoreResume(e);
        });
      }
      window.scrollTo(0, 0);
    `;

    if (url.pathname === '/sudo') {
      const auth = request.headers.get('Authorization');
      const expectedAuth = env.SUDO_AUTH_B64 ? `Basic ${env.SUDO_AUTH_B64}` : 'Basic ' + btoa('admin:admin'); // fallback for local dev if unset
      if (auth !== expectedAuth) {
        return new Response('unauthorized', {
          status: 401,
          headers: {
            'WWW-Authenticate': 'Basic realm="restricted telemetry access"',
            'Content-Type': 'text/plain'
          }
        });
      }
      const autoScript = `<script>window._sd = ${safeData}; window._authMode = true; window.onload = async () => { ${renderDiagnostics} };</script>`;
      return new Response('<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>' + autoScript + '</body></html>', {
        headers: { 'content-type': 'text/html;charset=UTF-8' }
      });
    }

    const script = `<script>
      window._sd = ${safeData};
      window._authMode = false;
      (function () {
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
          const legStr = leg.length ? leg.join(' \u00b7 ') : 'https';
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
              parts.push('bgp prefix: ' + prefix + ' (' + (rir ? rir + ' \u00b7 ' : '') + asnStr + ')');
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
                line += ' \u00b7 <1ms rtt (>99% of the speed of light in fiber; geo approx)';
              } else if (hasRtt && rtt > 0 && distKm >= 5) {
                const fiberSpeedKmPerMs = 299792.458 / 1.468 / 1000;
                const pct = Math.round(((2 * distKm) / rtt / fiberSpeedKmPerMs) * 100);
                if (pct > 100) {
                  line += ' \u00b7 ' + rtt + 'ms rtt (>99% of the speed of light in fiber; geo approx)';
                } else if (pct > 0) {
                  line += ' \u00b7 ' + rtt + 'ms rtt (~' + pct + '% of the speed of light in fiber)';
                }
              } else if (hasRtt && rtt > 0) {
                line += ' \u00b7 ' + rtt + 'ms rtt';
              }
              parts.push(line);
            } else if (coloKey && hasRtt) {
              parts.push('-> ' + coloKey.toLowerCase() + ' \u00b7 ' + (rtt === 0 ? '<1' : rtt) + 'ms rtt');
            }
            lines.push(parts.join(' '));

            const tlsBits = [];
            if (net.tls_cipher) tlsBits.push('cipher: ' + String(net.tls_cipher).toLowerCase());
            if (trace.kex) tlsBits.push('kex: ' + String(trace.kex).toLowerCase());
            if (trace.sni) tlsBits.push('sni: ' + String(trace.sni).toLowerCase());
            if (trace.warp) tlsBits.push('warp: ' + String(trace.warp).toLowerCase());
            if (tlsBits.length) lines.push(tlsBits.join(' \u00b7 '));

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
            timingBits.push('dom ' + document.documentElement.outerHTML.length.toLocaleString() + ' bytes');
            lines.push(timingBits.join(' \u00b7 '));

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
            const htmlBytes = document.documentElement.outerHTML.length;
            const textBytes = text.length;
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
              'viewport: ' + vpPx.toLocaleString() + ' physical pixels (~' + vpMp + ' mp @ ' + dpr + 'x dpr) \u00b7 unrolled page: ' + fullPx.toLocaleString() + ' px',
              'display: ' + screen.colorDepth + '-bit \u00b7 ' + gamut + ' gamut \u00b7 os prefers ' + osTheme + ', viewing ' + pageTheme,
              'document: ' + words.toLocaleString() + ' words \u00b7 ' + links + ' links \u00b7 ' + domNodes + ' dom nodes \u00b7 ' + (htmlBytes / 1024).toFixed(1) + ' kb html -> ' + (textBytes / 1024).toFixed(1) + ' kb text',
              hw.join(' \u00b7 ')
            ];
            if (shaLine) tLines.push(shaLine);
            triviaBody.textContent = tLines.join('\\n');
          });
        }
      })();
      let _k = [];
      const runDiag = async () => {
        ${renderDiagnostics}
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
    </script>`;
    
    return new Response(resumeHtml.replace('</body>', script + '\n</body>'), {
      headers: {
        "content-type": "text/html;charset=UTF-8",
        "server-timing": `edge-now;dur=${startMs}`,
      },
    });
  },
};
