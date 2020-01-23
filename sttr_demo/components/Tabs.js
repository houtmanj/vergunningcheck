import { useRouter } from 'next/router';
import Link from 'next/link';

export default ({ phase }) => {
  return (
    <>
      <style jsx>{`
        span {
          display: inline-block;
          padding: 1em;
        }
        .active {
          background: #e22;
          color: white;
          font-weight: bold;
        }
      `}</style>
      <span className={phase === 'PREFACE' && 'active'}>Inleiding</span>
      <span className={phase === 'LOCATION' && 'active'}>Locatie</span>
      <span className={phase === 'QUESTIONS' && 'active'}>Vragen</span>
      <span className={phase === 'OVERVIEW' && 'active'}>Uitkomsten</span>
      <span className={phase === 'CONCLUSION' && 'active'}>Plichten</span>
    </>
  );
};
