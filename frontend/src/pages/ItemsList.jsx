const mockItems = [
    { id: 1, name: "Item 1", description: "Description for Item 1", image: "https://placehold.net/400x400.png" },
    { id: 2, name: "Item 2", description: "Description for Item 2", image: "https://placehold.net/400x400.png" },
    { id: 3, name: "Item 3", description: "Description for Item 3", image: "https://placehold.net/400x400.png" }
]

const ItemsList = () => {
    return (
        <>
            <h2 className="text-2xl font-bold m-4">Archives</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockItems.map(item => (
                    <div key={item.id} className="border rounded p-4">
                        <img src={item.image} alt={item.name} className="w-full h-32 object-cover mb-2" />
                        <h2 className="text-xl font-bold">{item.name}</h2>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ItemsList;