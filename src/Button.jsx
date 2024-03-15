

const Button = ({ content, style, action }) => {

    return (
        <button className={style} onClick={action} >
            {content}
        </button >
    )
}

export default Button;