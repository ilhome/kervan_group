export const DEMO_ACCOUNTS = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'warehouse', password: 'warehouse123', role: 'warehouse' },
  { username: 'driver', password: 'driver123', role: 'driver' },
  { username: 'store-downtown', password: 'store123', role: 'store', branchId: '1' },
  { username: 'store-riverside', password: 'store123', role: 'store', branchId: '2' },
  { username: 'store-oldtown', password: 'store123', role: 'store', branchId: '3' },
];

export function authenticateDemoUser(username, password, branches) {
  const normalizedUsername = username.trim().toLowerCase();
  const presetAccount = DEMO_ACCOUNTS.find((account) => (
    account.username === normalizedUsername && account.password === password
  ));
  if (presetAccount) {
    if (presetAccount.branchId) {
      const branch = branches.find((item) => item.branch_id === presetAccount.branchId);
      if (!branch?.active) return null;
    }
    return presetAccount;
  }

  const branch = branches.find((item) => (
    item.store_username?.trim().toLowerCase() === normalizedUsername
    && item.store_password === password
    && item.active
  ));
  if (!branch) return null;

  return {
    username: branch.store_username,
    role: 'store',
    branchId: branch.branch_id,
  };
}
