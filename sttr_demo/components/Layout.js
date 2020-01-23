import Nav from './Nav';

export default ({ children }) => {
  return (
    <div>
      <style jsx global>{`
        body {
          font-family: Arial;
          padding: 1em;
        }
        input[type='submit'],
        input[type='button'],
        button {
          padding: 0.7rem 1.2rem;
          background-color: #55e;
          color: white;
          border: none;
          font-size: 15px;
          cursor: pointer;
          font-weight: bold;
        }
        input[type='button']:hover,
        button:hover {
          background: #77f;
        }
        input[type='button']:disabled,
        button:disabled {
          background-color: #ccc;
        }
      `}</style>
      <Nav />
      {children}
    </div>
  );
};
