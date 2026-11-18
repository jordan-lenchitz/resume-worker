export type InlineSegment = string | { href: string; text: string } | { em: string };

export interface ExperienceItem {
	role: string;
	organization: InlineSegment[];
	period: string;
	notes: InlineSegment[][];
}

export interface EducationItem {
	institution: string;
	details: InlineSegment[][];
	after?: InlineSegment[];
}

export interface ResumeData {
	title: string;
	nameLine: InlineSegment[];
	subtitle: InlineSegment[];
	likes: InlineSegment[][];
	experience: ExperienceItem[];
	education: EducationItem[];
	referencesHeading: string;
	contactEmail: string;
	sourceCodeLink: InlineSegment;
	signatureLabel: string;
	signatureBlock: string;
}

const link = (href: string, text: string): InlineSegment => ({ href, text });
const em = (text: string): InlineSegment => ({ em: text });

export const RESUME_DATA: ResumeData = {
	title: 'resume | jordan lenchitz',
	nameLine: [
		link('https://www.youtube.com/channel/UCCYpb47d3G3TpAN-T_Zc_qg', 'jordan'),
		' ',
		link('https://scholar.google.com/citations?user=pDsbnHcAAAAJ&hl=en', 'lenchitz'),
		' (',
		link('https://linkedin.com/in/jordan-lenchitz', 'linkedin'),
		' ',
		link('https://github.com/jordan-lenchitz', 'github'),
		' ',
		link('https://yottadb.com/yottadb-as-a-creative-platform-experimental-video-art-at-scale/', 'blog'),
		')',
	],
	subtitle: ['systems engineer and experimental artist'],
	likes: [
		['hard problems'],
		['free and open-source software'],
		['the ', link('https://en.wikipedia.org/wiki/Ben_Johnston_(composer)#Recordings', 'string quartets of ben johnston')],
	],
	experience: [
		{
			role: 'site reliability engineer',
			organization: ["epic systems's epic hosting"],
			period: 'june 2023 to may 2026',
			notes: [
				[
					'my primary job from 2024 onward was ensuring 100% single sign-on (SSO) uptime for ',
					link('https://central.mychart.org', 'mychart central'),
					'. i architected ',
					link('https://www.intersystems.com/products/iris/', 'intersystems iris'),
					' backends both ',
					link('https://www.vmware.com/docs/vmw-451-why-vms-remain-a-driving-force', 'on-prem'),
					' and in ',
					link('https://azure.microsoft.com/', 'public cloud'),
					', built and maintained unique ',
					link('https://datatracker.ietf.org/doc/html/rfc8446', 'tls 1.3'),
					' infrastructure leveraging ',
					link('https://dev.digicert.com/certcentral-apis/services-api.html', 'PKI'),
					'-as-',
					link('https://docs.ansible.com/', 'code'),
					' for SOC 2 compliance, troubleshooted an etl modernization project moving from on-prem nightly to ',
					link('https://rsmus.com/insights/services/digital-transformation/epics-shift-to-microsoft-fabric-data-analytics.html', 'cogito cloud'),
					" (epic's realtime analytics product leveraging ",
					link('https://www.microsoft.com/en-us/microsoft-fabric', 'microsoft fabric'),
					' and ',
					link('https://www.snowflake.com/en/', 'snowflake'),
					'), and helped improve cross-team server observability leveraging ',
					link('https://grafana.com/', 'Grafana'),
					' on ',
					link('https://www.openstack.org/', 'Openstack'),
					' (and ',
					link('https://prometheus.io/', 'Prometheus'),
					' for good measure) ',
				],
				[
					'beyond mychart central i supported the backend for the epic instances of dozens of healthcare organizations in the UK Canada and United States. i also had the honor of working with ',
					link('https://www.fisglobal.com/', 'FIS'),
					' on their ',
					link('https://sourceforge.net/projects/fis-gtm/', 'open-source GT.M ("Greystone Technology MUMPS")'),
					'. i spent a lot of time reading their ',
					link('https://fis-gtm.sourceforge.io/manuals/ao/ch09s04.html', 'amazing explanation of their B*-tree open-source NoSQL database structure'),
					'; my personal favorite $Z* function is ',
					link('https://fis-gtm.sourceforge.io/manuals/pg/ch07s50.html', '$ZQGBLMOD'),
					', which enables an application to determine whether it can safely apply a lost transaction to the database. if you love free and open-source software check out these three cool release notes i validated: ',
					link('https://fis-gtm.sourceforge.io/releasenotes/GTM_V7.1-009_Release_Notes.html#id29', 'GTM-10833'),
					' (more flexibility in disaster recovery operations), ',
					link('https://fis-gtm.sourceforge.io/releasenotes/GTM_V7.1-010_Release_Notes.html#id738', 'GTM-11345'),
					" (external calls now recognize each M transaction's atomicity consistency isolation and durability), and ",
					link('https://fis-gtm.sourceforge.io/releasenotes/GTM_V7.1-011_Release_Notes.html#id28', 'GTM-11488'),
					" (race condition eliminated); if you ever think you do not love free and open-source go read GT.M's ",
					link('https://web.archive.org/web/20001209123800/http://linuxpr.com/releases/2859.html', 'original gnu/linux open source press release'),
					' and then you will :)',
				],
			],
		},
		{
			role: 'volunteer webmanager',
			organization: [link('https://www.minimalismsociety.net/', 'society for minimalist music')],
			period: 'may 2022 to may 2026',
			notes: [
				[
					'managed the web presence and digital archives for the society for minimalist music. this mostly involved migrating from legacy web hosting to ',
					link('https://www.squarespace.com/', 'squarespace'),
					' and supporting a ',
					link('https://www.paypal.com/', 'paypal'),
					' integration for membership dues and donations',
				],
			],
		},
		{
			role: 'adjunct assistant professor of music',
			organization: [link('https://www.ufl.edu/', 'university of florida')],
			period: 'january to may 2023',
			notes: [
				[
					'MUT 6617 (see ',
					link(
						'https://digitalworlds.ufl.edu/syllabi/2021/Summer/2021-Summer-MUT%206617%20-%20Approaches%20to%20Theoretical%20Analysis-196819.pdf',
						"my friend Jennifer's syllabus",
					),
					" for my model) online for master's students: ",
					link('https://en.wikipedia.org/wiki/Music_theory', 'music theory'),
					'/composition/',
					link('https://en.wikipedia.org/wiki/Musical_analysis', 'analysis'),
					' with an emphasis on practical applications to the field of ',
					link('https://en.wikipedia.org/wiki/Music_education', 'music education'),
				],
			],
		},
		{
			role: 'legacy fellowship',
			organization: [link('https://www.fsu.edu/', 'florida state university')],
			period: 'august 2018 to may 2023',
			notes: [
				[
					'five-year teaching position ',
					link(
						'https://gradschool.fsu.edu/funding-awards/graduate-school-fellowships-and-grants/fellowships-offered-by-the-graduate-school-0',
						'awarded ~10/year on a university-wide basis',
					),
				],
				[
					'taught written music theory as well as aural and ',
					link('https://en.wikipedia.org/wiki/Keyboard_instrument', 'keyboard skills'),
					' to music majors and minors, taught upper-division music theory electives, taught introductory ',
					link('https://en.wikipedia.org/wiki/Songwriter', 'songwriting'),
					' course to non-music majors, and advised students on 18th-, 19th-, and 20th-century ',
					link('https://en.wikipedia.org/wiki/Musical_composition', 'model composition'),
					' projects',
				],
			],
		},
		{
			role: 'distance learning architect',
			organization: [link('https://www.fsu.edu/', 'florida state university')],
			period: 'july to december 2020',
			notes: [
				[
					'optimized assessments for remote teaching due to the ',
					link('https://en.wikipedia.org/wiki/COVID-19_pandemic', 'SARS-COV-2 pandemic'),
					', created instructional media to facilitate ',
					link('https://en.wikipedia.org/wiki/Asynchronous_learning', 'asynchronous learning'),
					' outside of ',
					link('https://zoom.us/', 'synchronous class meetings'),
					', and designed and prepared multi-section ',
					link('https://www.instructure.com/canvas', 'Canvas LMS'),
					' sites for a two-semester 150-student course sequence',
				],
			],
		},
		{
			role: 'recitation instructor in mathematics',
			organization: [link('https://www.indiana.edu/', 'indiana university')],
			period: 'january 2015 to may 2018',
			notes: [
				[
					'lead group problem-solving and review sessions for 10-15 ',
					link('https://en.wikipedia.org/wiki/Calculus', 'calculus'),
					', ',
					link('https://en.wikipedia.org/wiki/Finite_mathematics', 'finite mathematics'),
					', and ',
					link('https://en.wikipedia.org/wiki/Fraction', 'college algebra'),
					' students at a time. my favorite part was working with ',
					link(
						'https://studentlife.indiana.edu/involvement-belonging/groups-scholars/admitted-students.html',
						'first-generation college students in summer sessions',
					),
					' to prepare them for starting college mathematics in the fall',
				],
			],
		},
	],
	education: [
		{
			institution: 'florida state university (2027)',
			details: [
				[
					'doctor of philosophy in music theory and composition with an emphasis on music cognition, computational music cognition, and the musicals of stephen sondheim',
				],
			],
			after: [
				link('https://github.com/jordan-lenchitz/listening', 'dissertation'),
				' = listening to ',
				em('a cappella'),
				' singing: an ecological approach',
			],
		},
		{
			institution: 'indiana university bloomington (2018)',
			details: [
				['bachelor of arts in french with highest distinction'],
				['bachelor of arts in mathematics with highest distinction and honors in mathematics'],
				['bachelor of music in music composition and piano performance with high distinction and honors in music'],
			],
		},
	],
	referencesHeading: 'references and esoteric trivia available upon request',
	contactEmail: 'sudo@jordanlenchitz.org',
	sourceCodeLink: link('https://github.com/jordan-lenchitz/resume-worker', 'source code of this resume'),
	signatureLabel: 'digitally signed \u00b7 x.509 v3 \u00b7 pkcs #7 detached signature',
	signatureBlock: `-----begin x.509 signature block-----
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
-----end x.509 signature block-----`,
};
