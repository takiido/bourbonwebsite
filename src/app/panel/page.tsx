'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth/client';
import styles from './page.module.scss';
import { AppData } from '@/lib/data';
import EditorLoading from '@/components/editor/EditorLoading';
import EventsEditor from '@/components/editor/EventsEditor';
import MenuEditor from '@/components/editor/MenuEditor';
import LeagueEditor from '@/components/editor/LeagueEditor';
import RatesEditor from '@/components/editor/RatesEditor';

export default function AdminDashboard() {
    const [data, setData] = useState<AppData | null>(null);
    const [activeTab, setActiveTab] = useState<'events' | 'menu' | 'league' | 'rates'>('events');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isPending && !session) {
            router.push('/auth/sign-in');
            return;
        }

        if (session && session.user?.role !== 'admin') {
            router.push('/dashboard');
            return;
        }

        if (session && session.user?.role === 'admin') {
            fetchData();
        }
    }, [router, session, isPending]);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/panel');
            const json = await res.json();
            setData(json);
        } catch (error) {
            console.error('Failed to fetch data', error);
        } finally {
            setLoading(false);
        }
    };

    const saveData = async (newData: AppData) => {
        setSaving(true);
        try {
            const res = await fetch('/api/panel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData),
            });
            if (res.ok) {
                setLastSaved(new Date());
            } else {
                console.error('Failed to save data');
            }
        } catch (error) {
            console.error('Failed to save data', error);
        } finally {
            setSaving(false);
        }
    };

    const handleDataChange = (newData: AppData) => {
        setData(newData);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setSaving(true);
        timeoutRef.current = setTimeout(() => {
            saveData(newData);
        }, 1000);
    };

    const handleLogout = async () => {
        try {
            await authClient.signOut();
            router.push('/auth/sign-in');
            router.refresh();
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleTabChange = (tab: 'events' | 'menu' | 'league' | 'rates') => {
        setActiveTab(tab);
        setIsMobileMenuOpen(false);
    };

    if (isPending) return null;
    if (!session) return null;
    if (session.user?.role !== 'admin') return null;

    return (
        <div className={styles.container}>
            <div className={styles.mobileHeader}>
                <h2 className={styles.sidebarTitle}>Bourbon Admin</h2>
                <button className={styles.menuButton} onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? '✕' : '☰'}
                </button>
            </div>

            <aside className={`${styles.sidebar} ${isScrolled ? styles.scrolled : ''} ${isMobileMenuOpen ? styles.open : ''}`}>
                <div className={styles.sidebarHeader}>
                    <h2 className={styles.sidebarTitle}>Bourbon Admin</h2>
                </div>
                <nav className={styles.nav}>
                    <button className={`${styles.navItem} ${activeTab === 'events' ? styles.active : ''}`} onClick={() => handleTabChange('events')}>Events</button>
                    <button className={`${styles.navItem} ${activeTab === 'menu' ? styles.active : ''}`} onClick={() => handleTabChange('menu')}>Menu</button>
                    <button className={`${styles.navItem} ${activeTab === 'league' ? styles.active : ''}`} onClick={() => handleTabChange('league')}>League</button>
                    <button className={`${styles.navItem} ${activeTab === 'rates' ? styles.active : ''}`} onClick={() => handleTabChange('rates')}>Rates</button>
                    <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
                </nav>
            </aside>

            <main className={styles.mainContent}>
                <div className={styles.topBar}>
                    <h1 className={styles.pageTitle}>
                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
                    </h1>
                    <div className={styles.syncStatus}>
                        Status:
                        {saving ? (
                            <span style={{ color: 'var(--color-text-accent)' }}>Saving...</span>
                        ) : lastSaved ? (
                            <span style={{ color: 'var(--color-text-muted)' }}>Saved {lastSaved.toLocaleTimeString()}</span>
                        ) : (
                            <span style={{ color: 'var(--color-text-muted)' }}>Everything synced</span>
                        )}
                    </div>
                </div>

                {loading || !data ? (
                    <EditorLoading />
                ) : (
                    <div className={styles.section}>
                        {activeTab === 'events' && (
                            <EventsEditor events={data.events} onChange={(events) => handleDataChange({ ...data, events })} loading={loading} saving={saving} />
                        )}
                        {activeTab === 'menu' && (
                            <MenuEditor menu={data.menu} onChange={(menu) => handleDataChange({ ...data, menu })} loading={loading} saving={saving} />
                        )}
                        {activeTab === 'league' && (
                            <LeagueEditor league={data.league} onChange={(league) => handleDataChange({ ...data, league })} />
                        )}
                        {activeTab === 'rates' && (
                            <RatesEditor rates={data.rates} onChange={(rates) => handleDataChange({ ...data, rates })} />
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}