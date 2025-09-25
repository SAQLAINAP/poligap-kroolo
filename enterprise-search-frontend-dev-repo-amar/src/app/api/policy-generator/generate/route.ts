import { NextResponse } from "next/server";

// Helper to call Gemini or Kroolo AI if keys/URLs are configured
async function generateWithAI(payload: {
  policyType: string;
  industry: string;
  region: string;
  orgType: string;
  frameworks: string[];
  applyRuleBase: boolean;
  customRules: string;
  kbNotes: string;
}) {
  const { policyType, industry, region, orgType, frameworks, applyRuleBase, customRules, kbNotes } = payload;

  const prompt = `You are a compliance policy writer. Generate a ${policyType} tailored for:
Industry: ${industry || 'N/A'}
Region: ${region || 'Global'}
Organization Type: ${orgType || 'General'}
Frameworks: ${frameworks.join(', ') || 'General Best Practices'}

Knowledge Base Notes:
${kbNotes || '-'}

Custom Rules/Constraints:
${customRules || '-'}

${applyRuleBase ? 'Apply stricter, audit-ready phrasing and ensure clause-level alignment to the named frameworks.' : 'Use practical, plain language and align with common best practices.'}

Return a clear, sectioned document with headings (1., 1.1 etc.), a short preamble, definitions (if applicable), obligations, responsibilities, exceptions, enforcement, review cadence, and change log placeholder.`;

  // Try Gemini (if key configured via env GEMINI_API_KEY and a simple endpoint downstream)
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const resp = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + geminiKey, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const json = await resp.json();
      const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return text as string;
    } catch (e) {
      // fallthrough to Kroolo AI
    }
  }

  // Try Kroolo AI endpoints if available
  const aiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL_KROOLO_AI;
  const baseUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
  if (aiUrl || baseUrl) {
    try {
      const reqBody = { prompt, enable: true, session_id: `policy_${Date.now()}` };
      let r = await fetch(`${aiUrl || ''}/global-chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(reqBody) });
      if (!r.ok && baseUrl) {
        r = await fetch(`${baseUrl}/kroolo-ai/chat-with-ai`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }) });
      }
      if (r.ok) {
        const txt = await r.text();
        const match = txt.match(/```(?:markdown|md)?([\s\S]*?)```/i) || txt.match(/\{[\s\S]*\}/);
        if (match?.[1]) return match[1];
        return txt;
      }
    } catch (e) {
      // fallthrough to template
    }
  }

  // Fallback template (simple but structured)
  return `Preamble\nThis ${policyType} outlines the principles and procedures for our organization. This draft is for reference only and must be reviewed by your legal/compliance team.\n\n1. Purpose\nDescribe the goal of this policy in context of ${industry || 'your industry'} and ${frameworks.join(', ') || 'general best practices'}.\n\n2. Scope\nApplies to systems, personnel, vendors, and data in ${region || 'your regions'}.\n\n3. Definitions\nKey terms and abbreviations used in this document.\n\n4. Roles and Responsibilities\nList accountable roles and their duties.\n\n5. Policy Statements\n5.1 Core Requirements\n5.2 Exceptions\n5.3 Enforcement\n\n6. Procedures\nHigh-level steps or references to SOPs.\n\n7. Review Cadence\nThe policy owner must review this policy at least annually or following significant changes.\n\n8. Change Log\n- v0.1 (Draft) - Initial version.\n`;
}

export async function POST(req: Request) {
  try {
    const { inputs } = await req.json();
    const content = await generateWithAI(inputs);
    return NextResponse.json({ ok: true, content });
  } catch (err) {
    console.error('/api/policy-generator/generate error', err);
    return NextResponse.json({ ok: false, content: '', error: 'internal_error' }, { status: 500 });
  }
}
