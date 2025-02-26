'use client';
import Link from 'next/link';
import {useRouter} from 'next/router';
import classNames from "classnames";
import {ReactNode} from "react";

const NavLink = ({href, children, className, target, onClick}: {
    href: string,
    target?: string,
    children: ReactNode,
    className?: ({isActive}: { isActive: boolean }) => string | string,
    onClick?: () => void
}) => {
    const router = useRouter();

    // Check if the current route matches the href
    const isActive = router.pathname === href || router.pathname.startsWith(href);
    const resolvedClassName =
        typeof className === 'function'
            ? className({isActive}) // Pass `isActive` to the function
            : className;
    return (
        <Link className={classNames(className, {active: isActive})} href={href}>
            <a target={target} onClick={onClick}
               className={resolvedClassName}

            >
                {children}
            </a>
        </Link>
    );
};

export default NavLink;