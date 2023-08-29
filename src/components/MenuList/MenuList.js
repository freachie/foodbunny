import "./MenuList.css";
import MenuCard from '../MenuCard/MenuCard';
import arrow from '../../assets/logos/down.png';

const MenuList = (props) => {
	const { setShowMenuList, showMenuList, ...menu } = props;
	const classId = "menu-title-" + menu?.title;
	return menu?.menu?.length ? (
		<div>
			<button
				className="menu-title"
				id={classId}
				onClick={() => {
					setShowMenuList();
					document
						.getElementById(classId)
						.scrollIntoView({ block: "nearest", behavior: "smooth" });
				}}>
				<p>{menu?.title + " (" + menu?.menu?.length + ")"}</p>
				<img
					className={`menu-expand-icon ${showMenuList ? "expanded" : ""}`}
					src={arrow}
					alt="down-arrow"
				/>
			</button>

			{showMenuList
				? menu?.menu?.map((card) => (
						<MenuCard
							key={card?.card?.info?.id}
							menu={card?.card?.info}
						/>
				  ))
				: null}
		</div>
	) : null;
};

export default MenuList;