import LoginForm from "./login-form"
import block from 'bem-cn-lite'

import './style.scss';
import { Text } from "@gravity-ui/uikit";

type Props = {}

const b = block('login-main')

export default function LoginMain({ }: Props) {
    return (
        <div className={b()}>
            <Text variant='display-1' className={b('title')} color='positive'>Kirish</Text>
            <LoginForm />
        </div>
    )
}