import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black/20 backdrop-blur-md py-12 border-t border-white/5 text-neutral-400">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-red-600 crimson-glow" />
              <span className="text-lg font-bold text-white tracking-tight">Filloutly</span>
            </div>
            <p className="text-sm text-neutral-500 mb-4">
              Turn forms into immersive cinematic experiences. Built for the elite creator class.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-red-400 transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-red-400 transition-colors">Themes</Link></li>
              <li><Link href="#" className="hover:text-red-400 transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-red-400 transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-red-400 transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-red-400 transition-colors">API Reference</Link></li>
              <li><Link href="#" className="hover:text-red-400 transition-colors">Community</Link></li>
              <li><Link href="#" className="hover:text-red-400 transition-colors">Showcase</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-red-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-red-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-red-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-600">
          <p>© {new Date().getFullYear()} Filloutly Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-white transition-colors">Discord</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
