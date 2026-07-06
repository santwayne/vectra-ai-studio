import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="container-wide py-16">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              NeuronX builds custom AI infrastructure for serious businesses —
              automating operations, accelerating decisions, and unlocking growth.
            </p>
            <Link to="/book" className="btn-primary mt-6 inline-flex">
              Book Consultation
            </Link>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Company</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/team" className="hover:text-foreground">Leadership & Team</Link></li>
              <li><Link to="/case-studies" className="hover:text-foreground">Case Studies</Link></li>
              <li><Link to="/insights" className="hover:text-foreground">Insights</Link></li>
              <li><Link to="/careers" className="hover:text-foreground">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Solutions</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><Link to="/product" className="hover:text-foreground">Product</Link></li>
              <li><Link to="/solutions" className="hover:text-foreground">AI Solutions</Link></li>
              <li><Link to="/industries" className="hover:text-foreground">Industries</Link></li>
              <li><Link to="/demo" className="hover:text-foreground">Book a Demo</Link></li>
              <li><Link to="/pilot" className="hover:text-foreground">30-Day Pilot</Link></li>
              <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Trust</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><Link to="/security" className="hover:text-foreground">Trust Center</Link></li>
              <li><Link to="/ai-governance" className="hover:text-foreground">AI Governance</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground">Privacy & DPA</Link></li>
              <li><Link to="/procurement" className="hover:text-foreground">Procurement Kit</Link></li>
              <li><Link to="/marketplace" className="hover:text-foreground">Cloud Marketplace</Link></li>
              <li><Link to="/compare" className="hover:text-foreground">Compare</Link></li>
              <li><Link to="/changelog" className="hover:text-foreground">Changelog</Link></li>
              <li><Link to="/whitepapers" className="hover:text-foreground">Whitepapers</Link></li>
              <li><Link to="/roi-calculator" className="hover:text-foreground">ROI Calculator</Link></li>
              <li><Link to="/status" className="hover:text-foreground">System Status</Link></li>
              <li><Link to="/terms" className="hover:text-foreground">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <div className="grid gap-6 text-xs text-muted-foreground md:grid-cols-3">
            <div>
              <p className="font-semibold text-foreground">NeuronX Intelligence Inc.</p>
              
            </div>
            <div>
              <p className="font-semibold text-foreground">Headquarters</p>
              <p className="mt-1">241 George St S, Brampton, ON L6Y 2E1</p>
              <p>Serving clients across Ontario</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Compliance</p>
              <p className="mt-1">SOC 2 Type II · GDPR · CCPA</p>
              <p className="mt-1">
                <a href="/.well-known/security.txt" className="hover:text-foreground">security.txt</a>
                <span className="opacity-40"> · </span>
                <a href="mailto:security@neuronx.ai" className="hover:text-foreground">security@neuronx.ai</a>
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
            <p>© {new Date().getFullYear()} NeuronX Intelligence Inc. All rights reserved.</p>
            <p className="font-mono">Built for enterprises that ship.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
