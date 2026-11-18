import { RESUME_DATA, type InlineSegment } from '../data/resume';
import { RESUME_STYLES, THEMES } from './styles';

export function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

function renderInline(segments: InlineSegment[]): string {
	return segments
		.map((seg) => {
			if (typeof seg === 'string') return escapeHtml(seg);
			if ('em' in seg) return `<em>${escapeHtml(seg.em)}</em>`;
			return `<a href="${escapeHtml(seg.href)}">${escapeHtml(seg.text)}</a>`;
		})
		.join('');
}

function buildResumeDocumentParts(): readonly [string, string] {
	const themeButtons = THEMES.map(
		(theme) => `    <button type="button" data-theme="${escapeHtml(theme.className)}">${escapeHtml(theme.label)}</button>`,
	).join('\n');

	const likesHtml = RESUME_DATA.likes.map((item) => `    <li>${renderInline(item)}</li>`).join('\n');

	const experienceHtml = RESUME_DATA.experience
		.map((item) => {
			const header = `<p><strong>${escapeHtml(item.role)}</strong> &middot; ${renderInline(item.organization)} &middot; ${escapeHtml(item.period)}</p>`;
			const notes = item.notes.map((note) => `  <blockquote>${renderInline(note)}</blockquote>`).join('\n');
			return `  ${header}\n${notes}`;
		})
		.join('\n\n');

	const educationHtml = RESUME_DATA.education
		.map((item) => {
			const header = `  <p><strong>${escapeHtml(item.institution)}</strong></p>`;
			const details = item.details.map((d) => `  <blockquote>${renderInline(d)}</blockquote>`).join('\n');
			const after = item.after ? `\n  <p>${renderInline(item.after)}</p>` : '';
			return `${header}\n${details}${after}`;
		})
		.join('\n\n');

	const head = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(RESUME_DATA.title)}</title>
  <style>
${RESUME_STYLES}
  </style>
</head>
<body>

  <div id="theme-buttons">
${themeButtons}
  </div>

  <h2>${renderInline(RESUME_DATA.nameLine)}</h2>
  <h3>${renderInline(RESUME_DATA.subtitle)}</h3>

  <h3>likes:</h3>
  <ul>
${likesHtml}
  </ul>

  <h2>experience</h2>

${experienceHtml}

  <h2>education</h2>

${educationHtml}

  <h2>${escapeHtml(RESUME_DATA.referencesHeading)}</h2>
  <p>${renderInline([RESUME_DATA.sourceCodeLink])}</p>

  <h2>contact</h2>
  <p><a href="mailto:${escapeHtml(RESUME_DATA.contactEmail)}">${escapeHtml(RESUME_DATA.contactEmail)}</a></p>

  <hr>
  <div class="signature-box">
    <p class="signature-label">${escapeHtml(RESUME_DATA.signatureLabel)}</p>
    <pre class="signature-block">${escapeHtml(RESUME_DATA.signatureBlock)}</pre>
  </div>

  <p id="ip-display" class="telemetry-summary">
    client ipv6: loading... &middot; client ipv4: loading... &middot; gcp dns: 8.8.8.8
  </p>
  <p id="path-display" class="telemetry-line">
    path: resolving...
  </p>
  <details id="plumbing-details" class="telemetry-details">
    <summary>bgp prefix &amp; fiber path</summary>
    <p id="plumbing-body" class="telemetry-body">expand to inspect bgp prefix &amp; fiber propagation</p>
  </details>
  <details id="trivia-details" class="telemetry-details">
    <summary>screen &amp; document trivia</summary>
    <p id="trivia-body" class="telemetry-body">expand to inspect pixels, prose &amp; clock skew</p>
  </details>
`;

	const tail = `\n</body>
</html>`;

	return [head, tail] as const;
}

const [RESUME_HTML_HEAD, RESUME_HTML_TAIL] = buildResumeDocumentParts();

export function renderResumePage(scriptTag: string): string {
	return `${RESUME_HTML_HEAD}${scriptTag}${RESUME_HTML_TAIL}`;
}
