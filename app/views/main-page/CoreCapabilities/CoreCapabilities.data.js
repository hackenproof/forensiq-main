import secureEvidenceLockerSvg from "@/assets/images/main-page/secure-evidence-locker.svg";
import crossCaseAiCorrelationSvg from "@/assets/images/main-page/cross-case-ai-correlation.svg";
import cryptoBlockchainEngineSvg from "@/assets/images/main-page/advanced-crypto-blockchain-intelligence-engine.svg";

export const CAPABILITIES = [
  {
    title: "Secure Evidence Locker",
    illustration: { src: secureEvidenceLockerSvg, width: 102, height: 103 },
    description:
      "Centralize every artifact — drive images, memory dumps, network captures, and blockchain data exports — in one encrypted repository instead of scattered local drives and disconnected tools.",
    bullets: [
      "Encrypted ingestion, at-rest, and in-transit storage (cloud or on-premises)",
      "Cryptographic hashing on upload for tamper-evidence",
      "Granular, role-based access controls per case, per user, per artifact",
      "Full activity logging on every access, view, and export event",
    ],
  },
  {
    title: "Cross-Case AI Correlation",
    illustration: { src: crossCaseAiCorrelationSvg, width: 171, height: 94 },
    description:
      "Automatically compare new evidence against your organization's historical case data to surface connections a manual review would take weeks to find.",
    bullets: [
      "AI-driven matching across wallets, infrastructure, indicators, and actor patterns",
      "Configurable correlation scope (single unit, agency-wide, or cross-agency where authorized)",
      "Confidence scoring on every suggested connection",
    ],
  },
  {
    title: "Advanced Crypto & Blockchain Intelligence Engine",
    illustration: { src: cryptoBlockchainEngineSvg, width: 171, height: 94 },
    description:
      "Trace cryptocurrency flows from first touch to final destination, with wallet attribution powered by direct integration with the Crystal Intelligence database.",
    bullets: [
      "Multi-chain transaction tracing and fund-flow visualization",
      "Wallet attribution: exchanges, mixers, sanctioned entities, known threat actors",
      "Risk scoring on addresses and counterparties",
      "Direct API cross-referencing against Crystal Intelligence's entity dataset",
    ],
  },
];

export default CAPABILITIES;
