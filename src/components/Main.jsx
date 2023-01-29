const Main = () => {
  const state = null;
  const houses = Array(9).fill(state);

  return (
    <article>
      {houses.map((house, idx) => (
        <section key={idx} className="cell">
          <button
            type="button"
            className={
              house === 1 ? "circle" : house === 2 ? "square" : "empty"
            }
          ></button>
        </section>
      ))}
    </article>
  );
};

export default Main;
