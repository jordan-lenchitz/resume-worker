export interface ThemeDefinition {
	label: string;
	className: string;
}

export const THEMES: ThemeDefinition[] = [
	{ label: 'default', className: '' },
	{ label: 'dark', className: 'theme-dark' },
	{ label: 'violet', className: 'theme-violet' },
	{ label: 'indigo', className: 'theme-indigo' },
	{ label: 'blue', className: 'theme-blue' },
	{ label: 'green', className: 'theme-green' },
	{ label: 'yellow', className: 'theme-yellow' },
	{ label: 'orange', className: 'theme-orange' },
	{ label: 'red', className: 'theme-red' },
];

export const RESUME_STYLES = `    :root {
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
    body.theme-dark { --bg-color: #000; --text-color: #fff; --heading-color: #fff; --link-color: #e87458; --blockquote-color: #ddd; --blockquote-border: #777; }
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
    .signature-box {
      border: 1px solid var(--blockquote-border);
      border-radius: 4px;
      padding: 14px 16px;
      margin: 20px 0;
      background: color-mix(in srgb, var(--text-color) 4%, transparent);
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
      font-size: 0.85em;
      line-height: 1.5;
    }
    .signature-label { margin: 0 0 10px 0; color: var(--blockquote-color); }
    .signature-block { margin: 0; font-family: inherit; overflow-x: auto; }
    .telemetry-summary { text-align: center; margin-top: 30px; }
    .telemetry-line { text-align: center; margin-top: 6px; white-space: pre-line; }
    .telemetry-details { text-align: center; margin-top: 6px; }
    .telemetry-details summary { cursor: pointer; }
    .telemetry-body { margin-top: 6px; white-space: pre-line; }
    .sudo-trigger { position: fixed; bottom: 5px; right: 5px; opacity: 0.1; font-size: 10px; background: transparent; border: none; cursor: pointer; color: inherit; }`;
