const Main = () => {
  const state = {
    id: null,
    user: null,
  };
  const houses = Array(9).fill(state);

  console.log(houses);

  return (
    <article className="main">
      <div className="grid">
        {houses.map((house, idx) => (
          <section key={idx} className="cell">
            <button
              type="button"
              className={
                house.user &&
                (house.user === 1
                  ? "circle"
                  : house.user === 2
                  ? "times"
                  : "empty")
              }
            ></button>
          </section>
        ))}
      </div>
    </article>
  );
};

export default Main;
