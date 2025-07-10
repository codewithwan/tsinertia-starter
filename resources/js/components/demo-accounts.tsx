interface DemoAccountsProps {
  onSelectAccount: (email: string, password: string) => void;
}

const demoAccounts = [
  {
    role: 'Super Admin',
    email: 'superadmin@example.com',
    password: 'password',
    description: 'Full access to all features',
  },
  {
    role: 'Admin',
    email: 'admin@example.com',
    password: 'password',
    description: 'Administrative access',
  },
  {
    role: 'User',
    email: 'user@example.com',
    password: 'password',
    description: 'Standard user access',
  },
];

export default function DemoAccounts({ onSelectAccount }: DemoAccountsProps) {
  return (
    <div className="space-y-2">
      <div className="text-center text-sm text-muted-foreground">
        <span>Demo Accounts</span>
      </div>
      <div className="grid gap-2">
        {demoAccounts.map((account) => (
          <button
            key={account.email}
            type="button"
            onClick={() => onSelectAccount(account.email, account.password)}
            className="w-full rounded-lg border px-3 py-2 text-left transition-colors hover:bg-muted/50 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{account.role}</span>
              <span className="text-xs text-muted-foreground">{account.description}</span>
            </div>
            <div className="mt-0.5 text-sm text-muted-foreground">{account.email}</div>
          </button>
        ))}
      </div>
    </div>
  );
} 