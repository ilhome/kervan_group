import { useState } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import { Button, Field } from '../../components/ui.jsx';
import { DEMO_ACCOUNTS } from '../../auth/demoAuth.js';
import { newRow } from '../../utils/appData.js';

export default function AddBranchForm({ onCancel }) {
  const { branches, recordsRef, write, show, t, busy } = useAppContext();
  const [form, setForm] = useState({
    name: '',
    contact: '',
    phone: '',
    route: '',
    username: '',
    password: '',
  });
  const update = (key, value) => setForm((previous) => ({ ...previous, [key]: value }));

  const create = async (event) => {
    event.preventDefault();
    const username = form.username.trim();
    if (!form.name.trim() || !form.contact.trim() || !form.phone.trim()
      || !username || !form.password) {
      show(t('branchRequired'), true);
      return;
    }
    if (DEMO_ACCOUNTS.some((account) => account.username === username.toLowerCase())
      || branches.some((branch) => (
        branch.store_username?.trim().toLowerCase() === username.toLowerCase()
      ))) {
      show(t('usernameTaken'), true);
      return;
    }
    if (recordsRef.current.length >= 999) {
      show(t('limit'), true);
      return;
    }
    const branchId = String(
      Math.max(0, ...branches.map((branch) => Number(branch.branch_id) || 0)) + 1,
    );
    const branch = newRow({
      type: 'branch',
      branch_id: branchId,
      branch_name: form.name.trim(),
      contact_person: form.contact.trim(),
      contact_phone: form.phone.trim(),
      delivery_route: form.route.trim(),
      active: true,
      store_username: username,
      store_password: form.password,
    });
    if (await write('create', branch, 'create-branch', t('branchCreated'))) onCancel();
  };

  return (
    <form className="panel p-4 sm:p-5 stack mb-4" onSubmit={create}>
      <h3 className="font-bold">{t('createBranch')}</h3>
      <div className="form-grid">
        <Field id="new-branch-name" label={t('branchName')} required value={form.name} onChange={(event) => update('name', event.target.value)} />
        <Field id="new-branch-manager" label={t('contact')} required value={form.contact} onChange={(event) => update('contact', event.target.value)} />
        <Field id="new-branch-phone" label={t('managerPhone')} type="tel" autoComplete="tel" required value={form.phone} onChange={(event) => update('phone', event.target.value)} />
        <Field id="new-branch-route" label={t('routeNotes')} value={form.route} onChange={(event) => update('route', event.target.value)} />
        <Field id="new-branch-username" label={t('storeLoginName')} autoComplete="off" required value={form.username} onChange={(event) => update('username', event.target.value)} />
        <Field id="new-branch-password" label={t('storeLoginPassword')} type="password" autoComplete="new-password" required value={form.password} onChange={(event) => update('password', event.target.value)} />
      </div>
      <p className="small-meta">{t('demoWarning')}</p>
      <div className="action-bar">
        <Button type="submit" disabled={busy === 'create-branch'}>
          {busy === 'create-branch' ? t('saving') : t('createBranch')}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>{t('cancel')}</Button>
      </div>
    </form>
  );
}
