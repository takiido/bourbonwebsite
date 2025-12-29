'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { LeagueTeam } from '@/lib/data';
import styles from '@/app/panel/page.module.scss';

interface LeagueEditorProps {
    league: LeagueTeam[];
    onChange: (league: LeagueTeam[]) => void;
}

export default function LeagueEditor({ league, onChange }: LeagueEditorProps) {
    const [teamModal, setTeamModal] = useState<{
        isOpen: boolean;
        mode: 'add' | 'edit';
        index?: number;
        data: LeagueTeam;
    }>({
        isOpen: false,
        mode: 'add',
        data: { rank: 0, team: '', points: 0, played: 0, won: 0, lost: 0 }
    });

    const openAddTeam = () => {
        setTeamModal({
            isOpen: true,
            mode: 'add',
            data: { rank: league.length + 1, team: '', points: 0, played: 0, won: 0, lost: 0 }
        });
    };

    const openEditTeam = (index: number, team: LeagueTeam) => {
        setTeamModal({
            isOpen: true,
            mode: 'edit',
            index,
            data: { ...team }
        });
    };

    const closeTeamModal = () => {
        setTeamModal({ ...teamModal, isOpen: false });
    };

    const saveTeam = () => {
        const { index, mode, data } = teamModal;
        if (!data.team) return;

        const newLeague = [...league];
        if (mode === 'add') {
            newLeague.push(data);
        } else if (mode === 'edit' && index !== undefined) {
            newLeague[index] = data;
        }
        newLeague.sort((a, b) => a.rank - b.rank);
        onChange(newLeague);
        closeTeamModal();
    };

    const deleteTeam = (index: number) => {
        if (confirm('Delete this team?')) {
            const newLeague = league.filter((_, i) => i !== index);
            onChange(newLeague);
        }
    };

    return (
        <div>
            <Button onClick={openAddTeam} variant="outline" className={styles.addButton}>Add Team</Button>

            {teamModal.isOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3 className={styles.modalTitle}>{teamModal.mode === 'add' ? 'Add Team' : 'Edit Team'}</h3>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Rank</label>
                            <input
                                type="number"
                                className={styles.input}
                                value={teamModal.data.rank}
                                onChange={(e) => setTeamModal({ ...teamModal, data: { ...teamModal.data, rank: parseInt(e.target.value) || 0 } })}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Team Name</label>
                            <input
                                className={styles.input}
                                value={teamModal.data.team}
                                onChange={(e) => setTeamModal({ ...teamModal, data: { ...teamModal.data, team: e.target.value } })}
                                placeholder="Team Name"
                                autoFocus
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Points</label>
                                <input
                                    type="number"
                                    className={styles.input}
                                    value={teamModal.data.points}
                                    onChange={(e) => setTeamModal({ ...teamModal, data: { ...teamModal.data, points: parseInt(e.target.value) || 0 } })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Played</label>
                                <input
                                    type="number"
                                    className={styles.input}
                                    value={teamModal.data.played}
                                    onChange={(e) => setTeamModal({ ...teamModal, data: { ...teamModal.data, played: parseInt(e.target.value) || 0 } })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Won</label>
                                <input
                                    type="number"
                                    className={styles.input}
                                    value={teamModal.data.won}
                                    onChange={(e) => setTeamModal({ ...teamModal, data: { ...teamModal.data, won: parseInt(e.target.value) || 0 } })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Lost</label>
                                <input
                                    type="number"
                                    className={styles.input}
                                    value={teamModal.data.lost}
                                    onChange={(e) => setTeamModal({ ...teamModal, data: { ...teamModal.data, lost: parseInt(e.target.value) || 0 } })}
                                />
                            </div>
                        </div>
                        <div className={styles.modalActions}>
                            <Button onClick={closeTeamModal} variant="outline">Cancel</Button>
                            <Button onClick={saveTeam}>{teamModal.mode === 'add' ? 'Add' : 'Save'}</Button>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th} style={{ width: '60px' }}>Rank</th>
                            <th className={styles.th}>Team Name</th>
                            <th className={styles.th} style={{ width: '80px' }}>Pts</th>
                            <th className={styles.th} style={{ width: '80px' }}>P</th>
                            <th className={styles.th} style={{ width: '80px' }}>W</th>
                            <th className={styles.th} style={{ width: '80px' }}>L</th>
                            <th className={styles.th} style={{ width: '120px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {league.map((team, index) => (
                            <tr key={index} className={styles.tr}>
                                <td className={styles.td}>{team.rank}</td>
                                <td className={styles.td}>{team.team}</td>
                                <td className={styles.td}>{team.points}</td>
                                <td className={styles.td}>{team.played}</td>
                                <td className={styles.td}>{team.won}</td>
                                <td className={styles.td}>{team.lost}</td>
                                <td className={styles.td}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => openEditTeam(index, team)}
                                            style={{ background: 'none', border: 'none', color: 'var(--color-accent)', cursor: 'pointer', fontFamily: 'var(--font-subheading)' }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteTeam(index)}
                                            style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontFamily: 'var(--font-subheading)' }}
                                        >
                                            Del
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
