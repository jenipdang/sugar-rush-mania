const Filter = ({ categories, filterProducts }) => {
  return (
    <div className="btn-container">
			{categories?.map((category, index) => {
				return (
					<button
						type="button"
						className="filter-btn"
						key={index}
						onClick={() => filterProducts(category)}
					>
                        <div key={category.name} id={category.name}>
						{category}
                        </div>
					</button>
				);
			})}
		</div>
  )
}

export default Filter