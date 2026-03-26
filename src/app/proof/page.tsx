import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InfraProof from '@/components/InfraProof';

export const metadata: Metadata = {
  title: 'Infrastructure Proof — FTH / UnyKorn / Burns Empire',
  description:
    '57 systems. 8 Cloudflare domains. Full DNS topology and live URL directory for the entire FTH Trading / UnyKorn / Burns infrastructure stack.',
  openGraph: {
    title: 'Infrastructure Proof — Every System. Every URL. All Live.',
    description:
      '57 systems across capital infrastructure, AI intelligence, tokenization, compliance, and Web3 — verified and linked.',
  },
};

export default function ProofPage() {
  return (
    <>
      <Navbar />
      <InfraProof />
      <Footer />
    </>
  );
}
