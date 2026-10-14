import { useState } from 'react';
import { DEMO_ACCOUNTS } from '../auth/demoAuth.js';
import { Field } from './ui.jsx';

export default function LoginPage({ t, branches, onLogin, ready, loadError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    const account = onLogin(username, password);
    setInvalid(!account);
  };

  const accounts = [
    ...DEMO_ACCOUNTS.map((account) => ({
      ...account,
      branchName: account.branchId
        ? branches.find((branch) => branch.branch_id === account.branchId)?.branch_name
        : null,
    })).filter((account) => (
      !account.branchId || branches.some((branch) => branch.branch_id === account.branchId && branch.active)
    )),
    ...branches
      .filter((branch) => branch.active && branch.store_username && branch.store_password)
      .map((branch) => ({
        username: branch.store_username,
        password: branch.store_password,
        role: 'store',
        branchName: branch.branch_name,
      })),
  ];

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="brand-mark" aria-hidden="true">K</div>
        <p className="eyebrow mt-4">Kervan Restaurant</p>
        <h1>{t('loginTitle')}</h1>
        <p className="muted">{t('loginSubtitle')}</p>

        <form className="stack mt-5" onSubmit={submit}>
          <Field
            id="login-username"
            label={t('username')}
            autoComplete="username"
            required
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
              setInvalid(false);
            }}
          />
          <Field
            id="login-password"
            label={t('password')}
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setInvalid(false);
            }}
          />
          {invalid && <p className="notice error" role="alert">{t('invalidCredentials')}</p>}
          {loadError && <p className="notice error" role="alert">{t('loadFailed')}</p>}
          <button className="btn primary" type="submit" disabled={!ready}>
            {ready ? t('login') : t('loadingWorkspace')}
          </button>
        </form>

        <aside className="demo-credentials">
          <h2>{t('demoAccounts')}</h2>
          <p className="small-meta">{t('demoWarning')}</p>
          <ul>
            {accounts.map((account) => (
              <li key={`${account.username}-${account.branchName || account.role}`}>
                <span>
                  {t(account.role === 'driver' ? 'driverRole' : account.role)}
                  {account.branchName ? ` · ${account.branchName}` : ''}
                </span>
                <code>{account.username} / {account.password}</code>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </main>
  );
}
