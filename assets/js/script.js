const me = {
  github: "ionicether",
  title: "Platform Engineer",
  company: "Contractor, Bonneville Power Administration",
  intro:
    "I'm a government contractor supporting Bonneville Power Administration, the federal agency that runs high-voltage transmission across the Pacific Northwest. I build CI/CD pipelines, automation, and Kubernetes platforms, lead cloud migrations from assessment through cutover, and design disaster recovery that holds up under audit and under load. I'm also a member of the InfraGard National Members Alliance, the FBI's partnership with private individuals working to protect U.S. critical infrastructure.",
  location: "Portland, Oregon",
  photo: "assets/img/avatar.jpg",
  typing: [
    "terraform plan -out=tfplan",
    "terraform apply tfplan",
    "az bicep build --file main.bicep",
    "ansible-playbook site.yml",
    "sudo puppet agent -t",
    "kubectl get nodes",
    "sudo dnf upgrade --security",
    "git push origin main",
  ],
  skills: [],
  tools: [
    "AWS, Azure",
    "Kubernetes",
    "Terraform, Bicep, ARM Templates",
    "Ansible, Puppet",
    "Azure DevOps, CI/CD",
    "PowerShell, Bash, Python",
    "JavaScript, TypeScript, Go",
    "HCL, JSON, YAML",
    "VMware, Linux",
  ],
  cv: "mailto:ian@morley.dev?subject=Resume%20request",
  specialties: [
    {
      title: "Infrastructure as code",
      text: "Terraform, Bicep, and ARM templates wired into deployment pipelines, so releases are repeatable across environments and drift stays out.",
    },
    {
      title: "Configuration management",
      text: "Puppet and Ansible replacing hand-built servers with version-controlled automation across enterprise environments.",
    },
    {
      title: "Security and compliance",
      text: "Hardening to DISA STIG baselines in FedRAMP-authorized environments, CVE remediation, patch cadence, and SIEM rollouts like Microsoft Sentinel.",
    },
    {
      title: "Disaster recovery",
      text: "Recovery strategies built on Azure Site Recovery and Veeam, designed and tested so critical systems keep running.",
    },
    {
      title: "Identity and access",
      text: "Active Directory and Entra governance, RBAC modeling, GPO strategy, and Privileged Identity Management.",
    },
    {
      title: "Leadership and mentoring",
      text: "Led cross-functional teams through secure, scalable cloud rollouts, and mentored junior engineers with hands-on cloud training.",
    },
    {
      title: "Beyond work",
      text: "Street and nature photography, board games, and gaming of all kinds.",
      link: { label: "See my photos", url: "https://photos.morley.dev" },
    },
    {
      title: "Let's talk",
      text: "Working on something in platform, cloud, or infrastructure? I'm happy to hear about it.",
      link: { label: "Email me", url: "mailto:ian@morley.dev" },
    },
  ],
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/morleyian" },
    { label: "Blog", url: "https://blog.morley.dev" },
    { label: "Email", url: "mailto:ian@morley.dev" },
  ],
  careerStart: 2007,
  devopsStart: 2017,
  languages: 7,
  stats: [
    [6000, "Servers managed"],
    [121, "Workloads migrated"],
    [32, "Pipelines built"],
    [3000, "CVEs remediated"],
  ],
  featured: [
    "terraform-aws-cost-guard",
    "denoisejson",
    "puppet-gpo-conflicts",
    "blamforge",
    "vsphere-reportkit",
    "clear-puppetcerts",
  ],
  hidden: ["ionicether.github.io"],
  repoCount: 6,
};

const $ = (id) => document.getElementById(id);
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
const heat = getComputedStyle(document.documentElement)
  .getPropertyValue("--heat")
  .split(",")
  .map((c) => c.trim());

function el(tag, attrs = {}, text) {
  const node = Object.assign(document.createElement(tag), attrs);
  if (text != null) node.textContent = text;
  return node;
}

function ago(date) {
  const days = Math.round((new Date(date) - Date.now()) / 86400000);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  if (Math.abs(days) < 30) return rtf.format(days, "day");
  if (Math.abs(days) < 365) return rtf.format(Math.round(days / 30), "month");
  return rtf.format(Math.round(days / 365), "year");
}

function countUp(node, target) {
  if (still) return (node.textContent = `${target.toLocaleString("en-US")} +`);
  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / 1400);
    node.textContent = `${Math.round(target * (1 - (1 - t) ** 3)).toLocaleString("en-US")} +`;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const nextFrame = (fn) =>
  requestAnimationFrame(() => requestAnimationFrame(fn));

function typeLoop() {
  const out = $("typed");
  if (!me.typing.length) return;
  if (still) return (out.textContent = me.typing[0]);
  let phrase = 0,
    chars = 0,
    deleting = false;
  const tick = () => {
    const word = me.typing[phrase];
    chars += deleting ? -1 : 1;
    out.textContent = word.slice(0, chars);
    let wait = deleting ? 35 : 70;
    if (!deleting && chars === word.length) {
      deleting = true;
      wait = 1800;
    } else if (deleting && chars === 0) {
      deleting = false;
      phrase = (phrase + 1) % me.typing.length;
      wait = 400;
    }
    setTimeout(tick, wait);
  };
  tick();
}

function setPhoto(src) {
  for (const img of [$("avatar"), $("hero-avatar")]) img.src = src;
}

function addFact(label, value) {
  $("facts").append(el("dt", {}, label), el("dd", {}, value));
}

function addLink(label, url) {
  $("links").append(el("a", { href: url }, label));
}

function renderIdentity() {
  $("intro").textContent = me.intro;
  if (me.title) $("title").append(me.title);
  if (me.company) $("title").append(el("b", {}, me.company));
  if (me.location) addFact("Location", me.location);
  addLink("New GitHub", `https://github.com/${me.github}`);
  for (const { label, url } of me.links) addLink(label, url);
}

function fillFromGitHub(user) {
  if (!me.intro && user.bio) $("intro").textContent = user.bio;
  if (!me.photo) setPhoto(user.avatar_url);
  if (!me.company && user.company) $("title").append(el("b", {}, user.company));
  if (!me.location && user.location) addFact("Location", user.location);
}

function addCounter(label, value) {
  const num = el("strong", {}, "0 +");
  const box = el("div", { className: "counter" });
  box.append(num, el("span", {}, label));
  $("counters").append(box);
  if (value != null) countUp(num, value);
  return { box, num };
}

function renderRings(repos) {
  const counts = {};
  for (const r of repos)
    if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const rings = $("rings");
  rings.replaceChildren();
  if (!total) {
    rings.append(
      el(
        "p",
        { className: "status" },
        "Push code to a public repo and your languages show up here.",
      ),
    );
    return;
  }

  const circumference = 2 * Math.PI * 25;
  const top = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  for (const [lang, n] of top) {
    const pct = Math.round((n / total) * 100);
    const ring = el("div", { className: "ring" });
    const dial = el("div", { className: "dial" });
    dial.innerHTML = `<svg viewBox="0 0 58 58" aria-hidden="true">
      <circle class="track" cx="29" cy="29" r="25"></circle>
      <circle class="fill" cx="29" cy="29" r="25" stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}"></circle>
    </svg>`;
    dial.append(el("div", { className: "pct" }, `${pct}%`));
    ring.append(dial, el("div", { className: "lang" }, lang));
    rings.append(ring);
    nextFrame(
      () =>
        (ring.querySelector(".fill").style.strokeDashoffset =
          circumference * (1 - pct / 100)),
    );
  }
}

function renderSidebarLists() {
  if (!me.skills.length) $("skills-block").remove();
  for (const { name, level } of me.skills) {
    const head = el("div", { className: "bar-head" });
    head.append(el("span", {}, name), el("span", {}, `${level} %`));
    const fill = el("div");
    const bar = el("div", { className: "bar" });
    bar.append(fill);
    const row = el("div");
    row.append(head, bar);
    $("bars").append(row);
    nextFrame(() => (fill.style.width = `${level}%`));
  }

  if (!me.tools.length) $("tools-block").remove();
  for (const tool of me.tools) $("tools").append(el("li", {}, tool));

  if (me.cv) $("cv").href = me.cv;
  else $("cv-block").remove();
}

function card(title, text, link) {
  const box = el("article", { className: "card" });
  box.append(el("h3", {}, title));
  if (text) box.append(el("p", {}, text));
  if (link)
    box.append(el("a", { className: "more", href: link.url }, link.label));
  return box;
}

function renderSpecialties() {
  if (!me.specialties.length) return $("specialties-section").remove();
  for (const { title, text, link } of me.specialties)
    $("specialties").append(card(title, text, link));
}

const dayKey = (d) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

function renderHeatmap(events) {
  const perDay = {};
  for (const e of events) {
    const day = dayKey(new Date(e.created_at));
    perDay[day] = (perDay[day] || 0) + 1;
  }

  const end = new Date();
  end.setHours(0, 0, 0, 0);
  const start = new Date(end);
  start.setDate(end.getDate() - end.getDay() - 7 * 12);

  const days = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    days.push([new Date(d), perDay[dayKey(d)] || 0]);
  }

  const max = Math.max(1, ...days.map(([, n]) => n));
  let total = 0;
  for (const [d, n] of days) {
    total += n;
    const level = n === 0 ? 0 : Math.ceil((n / max) * (heat.length - 1));
    const cell = el("div", { title: `${n} on ${d.toDateString()}` });
    cell.style.background = heat[level];
    $("heatmap").append(cell);
  }

  $("activity-note").textContent =
    `${total} public actions on GitHub in the last 13 weeks (pushes, PRs, issues, and so on).`;
  const legend = $("legend");
  legend.append("Less");
  for (const c of heat) {
    const swatch = el("i");
    swatch.style.background = c;
    legend.append(swatch);
  }
  legend.append("More");
}

function renderRepos(repos) {
  const list = $("repos");
  if (!repos.length)
    return list.append(
      el("p", { className: "status" }, "No public repos yet."),
    );
  const featured = me.featured
    .map((name) => repos.find((r) => r.name === name))
    .filter(Boolean);
  const rest = repos.filter((r) => !featured.includes(r));
  for (const repo of [...featured, ...rest].slice(0, me.repoCount)) {
    const box = card(repo.name, repo.description, {
      label: "View on GitHub",
      url: repo.html_url,
    });
    const meta = el("div", { className: "meta" });
    if (repo.language) meta.append(el("span", {}, repo.language));
    if (repo.stargazers_count)
      meta.append(el("span", {}, `${repo.stargazers_count} ★`));
    meta.append(
      el("span", {}, `Updated ${ago(repo.pushed_at || repo.updated_at)}`),
    );
    box.querySelector(".more").before(meta);
    list.append(box);
  }
}

function showError(status) {
  const message =
    status === 404
      ? `No GitHub user named "${me.github}". Check the github field in assets/js/script.js.`
      : status === 403
        ? "GitHub is limiting requests from this network. Reload in an hour to see your stats."
        : `GitHub returned an error (${status}). Reload to try again.`;
  showGitHubMessage(message);
}

function showGitHubMessage(message) {
  $("rings").replaceChildren(el("p", { className: "status" }, message));
  $("activity-note").textContent = message;
  $("repos").replaceChildren(el("p", { className: "status" }, message));
}

async function load() {
  const year = new Date().getFullYear();
  $("year").textContent = year;
  renderIdentity();
  if (me.photo) setPhoto(me.photo);
  typeLoop();
  addCounter("Years in IT", year - me.careerStart);
  addCounter("Years in DevOps", year - me.devopsStart);
  addCounter("Languages", me.languages);
  const repoCount = addCounter("Public repos");
  repoCount.box.hidden = true;
  for (const [value, label] of me.stats) addCounter(label, value);
  renderSidebarLists();
  renderSpecialties();

  const base = `https://api.github.com/users/${me.github}`;
  const [userRes, reposRes] = await Promise.all([
    fetch(base),
    fetch(`${base}/repos?per_page=100&sort=pushed`),
  ]);
  if (!userRes.ok) return showError(userRes.status);
  if (!reposRes.ok) return showError(reposRes.status);

  const user = await userRes.json();
  const repos = (await reposRes.json()).filter(
    (r) => !r.fork && !me.hidden.includes(r.name),
  );
  fillFromGitHub(user);
  repoCount.box.hidden = false;
  countUp(repoCount.num, user.public_repos);
  renderRings(repos);
  renderRepos(repos);

  try {
    const responses = await Promise.all(
      [1, 2, 3].map((p) =>
        fetch(`${base}/events/public?per_page=100&page=${p}`),
      ),
    );
    if (!responses[0].ok) throw new Error(responses[0].status);
    const pages = await Promise.all(
      responses.map((r) => (r.ok ? r.json() : [])),
    );
    renderHeatmap(pages.flat());
  } catch {
    $("activity-note").textContent =
      "Couldn't load GitHub activity. Reload to try again.";
  }
}

load().catch(() =>
  showGitHubMessage("Couldn't reach GitHub. Check your connection and reload."),
);
