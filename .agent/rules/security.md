# Security Rules

## Critical Version Control (CVE-2025-55182)
- **Node.js**: MUST be >= 25.2.1 (Production standard).
- **React**: MUST be >= 19.2.3.
- **Next.js**: MUST be >= 16.0.7.
- **Forbidden**: React versions between 19.0.0 and 19.2.0.
- **Audit**: `react-server-dom-webpack` MUST be checked to be > 19.2.0.

## Server Actions
- All Server Actions must be manually audited for serialization risks.
- Do not pass raw database objects to client components.

## Dependency Management
- Downgrading these packages is STRICTLY FORBIDDEN.
- Any `npm install` affecting core libraries requires an audit check afterwards.
