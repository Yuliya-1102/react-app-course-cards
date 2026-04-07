const lists = [
    {
        task: "Интеграция REST API",
        icon: "🔗",
        isCompleted: false,
    },
    {
        task: "Добавить анимацию с Framer Motion",
        icon: "✨",
        isCompleted: true,
    },
    {
        task: "Настроить Zustand для состояния",
        icon: "⚡",
        isCompleted: false,
    },
];

const List = () => {
    return (
        <div>
            {lists.map((item, index) => (
                <section key={index}>
                    <p>{item.icon}</p>
                    <h2>{item.task}</h2>
                </section>
            ))}
        </div>
    );
};

export default List;
