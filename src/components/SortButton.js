import BlankButton from '../styles/BlankButton';
import VisuallyHidden from '../styles/VisuallyHidden';

const SortButton = ({ direction, id, onClick, sortBy }) => {
    const arrows = { ascending: '↓', descending: '↑' }
    const arrow = sortBy === id ? arrows[direction] : '↕︎'

    return (
        <BlankButton id={id} onClick={onClick}>
            {arrow}
            <VisuallyHidden>Sort {direction}</VisuallyHidden>
        </BlankButton>
    )
}

export default SortButton;