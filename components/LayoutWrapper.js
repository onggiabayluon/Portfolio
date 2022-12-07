import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import { AnimateSharedLayout, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Footer from './Footer'
import Image from './Image'
import Link from './Link'
import MobileNav from './MobileNav'
import SectionContainer from './SectionContainer'
import ThemeSwitch from './ThemeSwitch'

const NavItem = ({ item, selected }) => {
  return (
    <motion.div animate={{ opacity: selected ? 1 : 0.75 }}>
      <Link
        key={item.title}
        href={item.href}
        className="relative font-medium text-gray-900 dark:text-gray-100"
      >
        {item.title}
        {selected && (
          <motion.div className="absolute mt-1 w-full rounded-xl border-b-2" layoutId="underline" />
        )}
      </Link>
    </motion.div>
  )
}

const UnderlinedMenu = () => {
  const router = useRouter()

  return (
    <div className="underlined-menu">
      <div className="hidden space-x-8 sm:flex">
        <AnimateSharedLayout>
          {headerNavLinks.map((link) => (
            <NavItem item={link} key={link.title} selected={router.pathname == link.href} />
          ))}
        </AnimateSharedLayout>
      </div>
    </div>
  )
}

const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="mb-2 flex min-h-[5rem] items-center justify-between sm:mb-8">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <Image
                  width={45}
                  height={45}
                  className="aspect-square rounded-full object-cover"
                  src="/static/images/me_lowpoly_v1_u.jpg"
                  alt="DucHuy's Profile"
                />
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <UnderlinedMenu />
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
