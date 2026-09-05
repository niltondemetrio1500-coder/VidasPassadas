import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, LockKeyhole, Play, Sparkles, Star, X } from "lucide-react";

type Gender = "feminino" | "masculino";
type Answers = {
  gender?: Gender;
  day?: number;
  month?: number;
  year?: number;
  civilStatus?: string;
  challenge?: string;
  obstacle?: string;
  fname?: string;
  fullName?: string;
  email?: string;
  origin?: string;
};

const vturbPlayers = {
  female: { id: "vid-6a9b3ea07356a80134687eed", player: "6a9b3ea07356a80134687eed" },
  male: { id: "vid-6a9c2b669feaec9fe509aa56", player: "6a9c2b669feaec9fe509aa56" },
  long: { id: "vid-6a9b3ecb7356a80134687f0e", player: "6a9b3ecb7356a80134687f0e" },
} as const;

function VturbPlayer({ player, onTime }: { player: string; onTime: (time: number) => void }) {
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const tag = document.createElement("vturb-smartplayer");
    tag.id = `vid-${player}`;
    tag.style.display = "block";
    tag.style.margin = "0 auto";
    tag.style.width = "100%";
    tag.style.maxWidth = "400px";
    const placeholder = document.createElement("div");
    placeholder.className = "vturb-player-placeholder";
    placeholder.style.position = "relative";
    placeholder.style.width = "100%";
    placeholder.style.padding = "178.21782178217822% 0 0";
    placeholder.style.zIndex = "0";
    placeholder.style.backgroundColor = "black";
    tag.appendChild(placeholder);
    host.replaceChildren(tag);
    const scriptId = `vturb-script-${player}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "text/javascript";
      script.src = `https://scripts.converteai.net/dc8ab8c0-f9ac-47c3-af12-a4174ba40c45/players/${player}/v4/player.js`;
      script.async = true;
      document.head.appendChild(script);
    }
    return () => { host.replaceChildren(); };
  }, [player]);
  return <div ref={hostRef} className="w-full" aria-label="Vídeo hospedado na VTurb" />;
}

const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const civilStatuses = [
  ["casado", "💍 Casado(a)/junto"], ["separado", "💔 Separado(a)"], ["viuvo", "🕊️ Viúvo(a)"], ["solteiro", "🙋 Solteiro(a)"],
];
const challenges = [["dinheiro", "💰 Dinheiro"], ["amor", "❤️ Amor"], ["saude", "🩺 Saúde"], ["paz", "☮️ Paz e felicidade"]];
const obstacles = [["some", "💨 Some na última hora"], ["imprevisto", "⚡ Aparece um imprevisto"], ["outro", "🤝 Vai parar na mão de outra pessoa"]];

function readAnswers(): Answers {
  try { return JSON.parse(localStorage.getItem("astra-clone-answers") || "{}"); } catch { return {}; }
}
function saveAnswers(a: Answers) { localStorage.setItem("astra-clone-answers", JSON.stringify(a)); }

function Shell({ children, progress, onBack }: { children: React.ReactNode; progress?: number; onBack?: () => void }) {
  return <main className="min-h-screen bg-[#080710] text-[#f7f3ea] overflow-x-hidden relative">
    <div className="stars" aria-hidden="true" />
    {onBack && <button aria-label="Voltar" onClick={onBack} className="absolute left-5 top-5 z-20 rounded-full p-2 text-white/55 hover:text-white transition"><ArrowLeft size={20} /></button>}
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-xl flex-col px-4 py-8 sm:px-8">{progress !== undefined && <div className="mb-8 flex gap-1.5" aria-label={`Etapa ${progress} de 10`}>{Array.from({ length: 10 }).map((_, i) => <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i < progress ? "bg-[#7c3aed]" : "bg-white/10"}`} />)}</div>}{children}</div>
  </main>;
}

function Button({ children, onClick, disabled = false, secondary = false }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean; secondary?: boolean }) {
  return <button disabled={disabled} onClick={onClick} className={`group w-full rounded-2xl px-5 py-4 text-base font-bold transition-all active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-40 ${secondary ? "border border-white/15 bg-white/[.04] text-white hover:bg-white/[.08]" : "bg-[#7c3aed] text-white shadow-[0_0_28px_rgba(124,58,237,.25)] hover:bg-[#8b5cf6]"}`}>{children}</button>;
}

function Landing({ start }: { start: (gender: Gender) => void }) {
  return <Shell><div className="flex flex-1 flex-col items-center pt-24 text-center sm:pt-28">
    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#e4b95b]/70 bg-[#201b36] px-4 py-1.5 text-[10px] font-extrabold tracking-[.16em] text-[#f2d479]">TESTE GRATUITO</div>
    <div className="relative mb-5 w-full max-w-[350px] overflow-hidden rounded-t-xl bg-[#211c43] shadow-[0_18px_45px_rgba(32,20,87,.4)] sm:max-w-[360px]">
      <img src="/hero-landing-optimized.jpg" alt="Mulher serena diante da silhueta de quem ela foi numa vida passada" className="block h-[135px] w-full object-cover object-center sm:h-[135px]" width="900" height="672" fetchPriority="high" decoding="async" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#080710] to-transparent" />
    </div>
    <h1 className="max-w-[350px] text-[1.95rem] font-black leading-[1.02] tracking-[-.035em] sm:max-w-lg sm:text-4xl">Descubra <span className="text-[#f2d479]">quem você foi</span><br /> numa <span className="text-[#f2d479]">vida passada</span></h1>
    <p className="mt-5 max-w-[350px] text-[16px] leading-relaxed text-[#a8a1b5] sm:text-base">Responda 7 perguntas rápidas. Seus <strong className="text-white">números</strong> mostram quem você foi — e por que isso explica tanta coisa hoje.</p>
    <div className="mt-auto w-full max-w-[350px] pt-20 sm:pt-24"><p className="mb-2 text-sm font-bold text-white">Você é:</p><div className="grid grid-cols-2 gap-1"><button onClick={() => { localStorage.setItem("astra-clone-answers", JSON.stringify({ ...readAnswers(), gender: "feminino" })); start("feminino"); }} className="rounded-l-xl border-2 border-[#7c3aed] bg-[#211b3e] px-3 py-5 text-[17px] font-extrabold text-white shadow-[0_0_18px_rgba(124,58,237,.24)] transition-all duration-200 hover:-translate-y-1 hover:bg-[#2c2252] active:scale-[.97]">👩<span className="ml-2">MULHER</span></button><button onClick={() => { localStorage.setItem("astra-clone-answers", JSON.stringify({ ...readAnswers(), gender: "masculino" })); start("masculino"); }} className="rounded-r-xl border-2 border-[#7c3aed] bg-[#211b3e] px-3 py-5 text-[17px] font-extrabold text-white shadow-[0_0_18px_rgba(124,58,237,.24)] transition-all duration-200 hover:-translate-y-1 hover:bg-[#2c2252] active:scale-[.97]">👨<span className="ml-2">HOMEM</span></button></div><div className="mt-2 flex justify-center gap-2 text-xs text-[#8d859b]"><span>⏱ Leva menos de 2 minutos</span><span>·</span><span>🔒 100% anônimo</span></div></div>
  </div><footer className="pt-8 text-center text-[11px] text-[#675f75]"><nav aria-label="Links legais" className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2"><a href="https://www.astranumerica.com.br/contato" target="_blank" rel="noreferrer" className="transition hover:text-[#f2d479]">Contato</a><span aria-hidden="true">·</span><a href="https://www.astranumerica.com.br/afiliados" target="_blank" rel="noreferrer" className="transition hover:text-[#f2d479]">Afiliados</a><span aria-hidden="true">·</span><a href="/politica-de-privacidade" className="transition hover:text-[#f2d479]">Política de Privacidade</a><span aria-hidden="true">·</span><a href="https://www.astranumerica.com.br/termos-de-uso" target="_blank" rel="noreferrer" className="transition hover:text-[#f2d479]">Termos de Uso</a></nav><span className="mt-3 inline-block">© 2026 Vidana Astranumerica. Todos os direitos reservados.</span></footer></Shell>;
}

function SelectStep({ title, options, value, setValue, next, progress }: { title: string; options: [string, string][]; value?: string; setValue: (v: string) => void; next: () => void; progress: number }) {
  const grid = options.length >= 28 ? "grid-cols-7" : options.length >= 10 ? "grid-cols-3" : options.length === 4 ? "grid-cols-1" : "grid-cols-1";
  return <Shell progress={progress} onBack={() => window.dispatchEvent(new Event('quiz:back'))}><div className="flex flex-1 flex-col items-center justify-center"><h2 className="flex max-w-[560px] items-center justify-center gap-8 text-center text-[30px] font-extrabold leading-[1.08] tracking-[-.025em] text-white sm:text-[30px]"><span className="motion-safe:animate-[pulse_2.4s_ease-in-out_infinite] grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#7c3aed] text-[16px]">↓</span>{title}<span className="motion-safe:animate-[pulse_2.4s_ease-in-out_infinite] grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#7c3aed] text-[16px]">↓</span></h2><div className={`mt-8 grid w-full max-w-[560px] gap-3 ${grid}`}>{options.map(([id, label]) => <button key={id} onClick={() => { setValue(id); window.setTimeout(next, 220); }} className={`min-h-[56px] rounded-xl border-2 px-2 text-center text-[17px] font-extrabold transition-all active:scale-[.98] ${value === id ? "border-[#7c3aed] bg-[#7c3aed] text-[#171426] shadow-[0_0_22px_rgba(124,58,237,.38)]" : "border-transparent bg-[#f6f6f7] text-[#242229] hover:-translate-y-0.5 hover:bg-white"}`}>{label}</button>)}</div><button onClick={() => window.dispatchEvent(new Event('quiz:back'))} className="mt-8 rounded-xl bg-[#6d28d9] px-6 py-3 text-base font-bold text-white shadow-[0_0_18px_rgba(124,58,237,.25)] hover:bg-[#7c3aed]">← Voltar</button></div></Shell>;
}

function NameStep({ answers, update, next }: { answers: Answers; update: (a: Partial<Answers>) => void; next: () => void }) {
  const [name, setName] = useState(answers.fname || "");
  return <Shell progress={10} onBack={() => window.dispatchEvent(new Event('quiz:back'))}><div className="flex flex-1 flex-col justify-center"><h2 className="text-3xl font-extrabold leading-tight text-center">Qual é o seu primeiro nome?</h2><input autoFocus value={name} onChange={e => setName(e.target.value)} placeholder="Insira seu primeiro nome" className="mt-8 w-full rounded-xl border-2 border-[#7c3aed] bg-white px-4 py-4 text-[#171426] outline-none focus:ring-2 focus:ring-[#f2d479]" /><div className="mt-5"><Button disabled={!name.trim()} onClick={() => { update({ fname: name.trim() }); next(); }}>Clique para continuar <ArrowRight className="ml-2 inline" size={18} /></Button></div></div></Shell>;
}

function Processing({ answers, done }: { answers: Answers; done: () => void }) {
  const [index, setIndex] = useState(0);
  const name = answers.fname || "você";
  const messages = [`Analisando suas respostas, ${name}…`, "Cruzando os números da sua data de nascimento com o seu nome…", `${name}, encontramos algo da sua vida passada que explica muita coisa…`, `Seu resultado está pronto. Vamos lá, ${name}.`];
  useEffect(() => { const timers = messages.map((_, i) => window.setTimeout(() => setIndex(i), 1800 * i)); const finish = window.setTimeout(done, 1800 * messages.length); return () => { timers.forEach(clearTimeout); clearTimeout(finish); }; }, []);
  return <main className="min-h-screen bg-[#080710] text-white stars flex flex-col items-center justify-center px-6 text-center"><div className="relative mb-8 h-12 w-12"><span className="absolute inset-0 rounded-full border-4 border-[#7c3aed]/25" /><span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#f2d479]" /></div><p className="text-lg font-semibold leading-relaxed text-white">{messages[index]}</p></main>;
}

function digitSum(value: number) {
  let n = Math.abs(value); while (n > 9) n = String(n).split("").reduce((a, d) => a + Number(d), 0); return n;
}
function nameNumber(value: string) {
  return digitSum(value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z]/g, "").split("").reduce((sum, c) => sum + ((c.charCodeAt(0) - 65) % 9) + 1, 0));
}
function BirthOverlay({ second, answers, visible }: { second?: boolean; answers: Answers; visible: boolean }) {
  if (!visible) return null;
  const date = answers.day && answers.month && answers.year ? `${String(answers.day).padStart(2, "0")}/${String(answers.month).padStart(2, "0")}/${answers.year}` : "";
  const dateDigits = date.replace(/\D/g, "");
  const life = digitSum(Number(dateDigits || "0"));
  const day = digitSum(answers.day || 0);
  const third = second ? nameNumber(answers.fullName || answers.fname || "") : null;
  return <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-[3%] bg-black/25 px-[6%] text-center font-sans"><p className="m-0 text-[clamp(14px,4vw,20px)] font-bold tracking-[.18em] text-[#c6b8e0] drop-shadow-lg">VIDA PASSADA DE</p><p className="m-0 text-[clamp(28px,8vw,44px)] font-extrabold leading-none text-[#f2d479] drop-shadow-lg">{(answers.fname || "VOCÊ").toUpperCase()}</p><p className="m-0 text-[clamp(20px,6vw,30px)] font-bold text-white drop-shadow-lg">{date}</p><div className="mt-[4%] flex items-center justify-center gap-[clamp(8px,3vw,18px)]"><span className="text-[clamp(44px,13vw,68px)] font-black leading-none text-[#f2d479]">{life}</span><span className="text-[clamp(36px,10vw,54px)] text-[#9a93a8]">–</span><span className="text-[clamp(44px,13vw,68px)] font-black leading-none text-[#f2d479]">{day}</span><span className="text-[clamp(36px,10vw,54px)] text-[#9a93a8]">–</span><span className="animate-pulse text-[clamp(56px,17vw,88px)] font-black leading-none text-[#ffd54a]">{third ?? "?"}</span></div><p className="absolute bottom-[4%] m-0 text-xs text-white">O seu nome e a sua data de nascimento</p></div>;
}

function Vsl({ second, answers, go }: { second?: boolean; answers: Answers; go: (page: string) => void }) {
  const isMale = answers.gender === "masculino";
  const player = second ? vturbPlayers.long : (isMale ? vturbPlayers.male : vturbPlayers.female);
  const releaseAt = isMale ? 302 : 297;
  const [canContinue, setCanContinue] = useState(false);
  useEffect(() => {
    if (second) return;
    const timer = window.setTimeout(() => setCanContinue(true), releaseAt * 1000);
    return () => window.clearTimeout(timer);
  }, [second, releaseAt]);
  return <Shell><div className="flex flex-1 flex-col items-center justify-center"><div className="mb-5 text-center"><div className="mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-[.2em] text-[#f2d479]"><Star size={14} fill="currentColor" /> SUA LEITURA PERSONALIZADA</div><h2 className="text-2xl font-extrabold">{second ? `${answers.fname || "Seu"}, aqui está a sua revelação` : isMale ? `Assista até o fim para descobrir o seu resultado` : `Assista até o fim para descobrir o seu resultado`}</h2></div><div className="relative w-full max-w-[404px] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl"><VturbPlayer player={player.player} onTime={() => undefined} /></div>{!second && <div className={`mt-7 w-full max-w-sm transition-opacity ${canContinue ? "opacity-100" : "pointer-events-none opacity-0"}`}><Button onClick={() => go("lead")} disabled={!canContinue}>Continuar <ArrowRight className="ml-2 inline" size={18} /></Button></div>}{second && <p className="mt-5 text-center text-xs text-[#8e879b]">Você pode pausar ou avançar usando os controles do vídeo.</p>}</div></Shell>;
}

function Lead({ answers, submit }: { answers: Answers; submit: (a: Partial<Answers>) => void }) {
  const [step, setStep] = useState<"fullName" | "email">("fullName");
  const [name, setName] = useState(answers.fullName || "");
  const [email, setEmail] = useState(answers.email || "");
  const [remaining, setRemaining] = useState(60000);
  useEffect(() => { const started = performance.now(); const timer = window.setInterval(() => { const elapsed = performance.now() - started; const value = 60000 - (elapsed % 60000); setRemaining(value); }, 50); return () => clearInterval(timer); }, []);
  const validName = name.trim().length >= 3 && name.trim().includes(" ");
  const validEmail = email.includes("@");
  const seconds = Math.floor(remaining / 1000).toString().padStart(2, "0");
  const millis = Math.floor(remaining % 1000).toString().padStart(3, "0");
  return <main className="min-h-screen bg-[#3a205e] px-6 text-center text-white"><div className="mx-auto flex min-h-screen w-full max-w-[380px] flex-col items-center justify-center gap-4 py-8"><div className="w-full rounded-xl bg-[#f2ad35] px-4 py-3.5 text-xl font-black tracking-tight text-white shadow-[0_0_20px_rgba(242,173,53,.35)]">⏱️ 00:{seconds}.{millis}</div>{step === "fullName" ? <><p className="max-w-[340px] text-[16px] leading-[1.3]">Falta pouco, <strong>{(answers.fname || "").toUpperCase()}</strong>! Precisamos do seu nome completo para revelar o <strong>último número da sua vida passada.</strong></p><h2 className="text-[31px] font-black leading-[1.05] tracking-[-.02em]">Qual é o seu nome<br />completo?</h2><div className="grid h-8 w-8 place-items-center rounded-full bg-[#c84ee6] text-lg">↓</div><input autoFocus value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === "Enter" && validName && setStep("email")} placeholder="Digite seu nome completo (obrigatório)" aria-label="Nome completo" className="w-full rounded-xl border-4 border-[#b66bd8] bg-white px-3 py-4 text-[16px] text-[#555] outline-none placeholder:text-[#aaa]" /><button onClick={() => validName && setStep("email")} className="w-full rounded-xl bg-[#be69df] px-5 py-4 text-lg font-black text-white shadow-[0_0_20px_rgba(190,105,223,.3)] transition active:scale-[.98] disabled:opacity-50" disabled={!validName}>Continuar</button></> : <><p className="max-w-[340px] text-[16px] leading-[1.3]">Digite o seu <strong>e-mail</strong> para receber o resultado da sua <strong>vida passada</strong>...</p><h2 className="text-[31px] font-black leading-[1.05]">Qual é o seu e-mail?</h2><div className="grid h-8 w-8 place-items-center rounded-full bg-[#c84ee6] text-lg">↓</div><input autoFocus type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && validEmail && submit({ fullName: name.trim(), email: email.trim() })} placeholder="Insira seu endereço de e-mail (obrigatório)" aria-label="E-mail" className="w-full rounded-xl border-4 border-[#b66bd8] bg-white px-3 py-4 text-[16px] text-[#555] outline-none placeholder:text-[#aaa]" /><button onClick={() => validEmail && submit({ fullName: name.trim(), email: email.trim() })} className="w-full rounded-xl bg-[#be69df] px-5 py-4 text-lg font-black text-white shadow-[0_0_20px_rgba(190,105,223,.3)] transition active:scale-[.98] disabled:opacity-50" disabled={!validEmail}>Ver meu resultado</button><button onClick={() => setStep("fullName")} className="text-sm font-bold text-white/80 underline">Voltar</button></>}</div></main>;
}

export default function Home() {
  const [page, setPage] = useState("landing"); const [answers, setAnswers] = useState<Answers>(() => readAnswers());
  useEffect(() => { const previous: Record<string, string> = { month: "landing", day: "month", decade: "day", year: "decade", civil: "year", challenge: "civil", obstacle: "challenge", origin: "obstacle", name: "origin", processing: "name" }; const onBack = () => setPage(previous[page] || "landing"); window.addEventListener("quiz:back", onBack); return () => window.removeEventListener("quiz:back", onBack); }, [page]);
  const update = (a: Partial<Answers>) => setAnswers(prev => { const next = { ...prev, ...a }; saveAnswers(next); return next; });
  const start = () => { setPage("birth"); };
  const go = (p: string) => setPage(p);
  const content = useMemo(() => {
    if (page === "landing") return <Landing start={(gender) => { update({ gender }); setPage("month"); }} />;
    if (page === "month") return <SelectStep title="Em que mês você nasceu?" options={monthNames.map((m, i) => [String(i + 1), m] as [string, string])} value={answers.month ? String(answers.month) : undefined} setValue={v => update({ month: Number(v) })} next={() => go("day")} progress={2} />;
    if (page === "day") return <SelectStep title="E em que dia?" options={Array.from({ length: new Date(2020, answers.month || 1, 0).getDate() }, (_, i) => [String(i + 1), String(i + 1)] as [string, string])} value={answers.day ? String(answers.day) : undefined} setValue={v => update({ day: Number(v) })} next={() => go("decade")} progress={3} />;
    if (page === "decade") return <SelectStep title="Em que década você nasceu?" options={[1910,1920,1930,1940,1950,1960,1970,1980,1990,2000,2010].map(y => [String(y), String(y)] as [string, string])} value={answers.year ? String(Math.floor(answers.year / 10) * 10) : undefined} setValue={v => update({ year: Number(v) })} next={() => go("year")} progress={4} />;
    if (page === "year") { const decade = Math.floor((answers.year || 1990) / 10) * 10; return <SelectStep title="E em que ano?" options={Array.from({ length: 10 }, (_, i) => [String(decade + i), String(decade + i)] as [string, string])} value={answers.year ? String(answers.year) : undefined} setValue={v => update({ year: Number(v) })} next={() => go("civil")} progress={5} />; }
    if (page === "civil") return <SelectStep title="Hoje, você está:" options={civilStatuses.map(([id, label]) => [id, label.replace("Em um relacionamento", "Casado(a)/junto").replace("Separado(a)", "Separado(a)")] as [string, string])} value={answers.civilStatus} setValue={v => update({ civilStatus: v })} next={() => go("challenge")} progress={6} />;
    if (page === "challenge") return <SelectStep title="Qual área da sua vida parece travar sempre no mesmo ponto?" options={challenges as [string, string][]} value={answers.challenge} setValue={v => update({ challenge: v })} next={() => go("obstacle")} progress={7} />;
    if (page === "obstacle") return <SelectStep title="Quando algo bom está quase dando certo, o que costuma acontecer?" options={[...obstacles, ["travo", "🔒 Eu mesmo(a) acabo travando"]] as [string, string][]} value={answers.obstacle} setValue={v => update({ obstacle: v })} next={() => go("origin")} progress={8} />;
    if (page === "origin") return <SelectStep title="Quando você olha pra trás, esse padrão parece vir de quando?" options={[["recente", "🕐 De uns anos pra cá"], ["sempre", "🧒 Desde que me conheço por gente"], ["vida-toda", "🌀 A vida toda…"], ["antes", "🔮 Sinto que vem de antes de eu nascer"]]} value={answers.origin} setValue={v => update({ origin: v } as Partial<Answers>)} next={() => go("name")} progress={9} />;
    if (page === "name") return <NameStep answers={answers} update={update} next={() => go("processing")} />;
    if (page === "processing") return <Processing answers={answers} done={() => go("vsl1")} />;
    if (page === "vsl1") return <Vsl answers={answers} go={go} />;
    if (page === "lead") return <Lead answers={answers} submit={a => { update(a); go("vsl2"); }} />;
    return <Vsl second answers={answers} go={go} />;
  }, [page, answers]);
  return content;
}
