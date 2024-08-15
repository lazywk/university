import { Moon, Sun } from "@gravity-ui/icons";
import { Button, Icon } from "@gravity-ui/uikit";
import { useAppDispatch, useAppSelector } from "@/store";
import { setTheme } from "@/store/theme";

type Props = {}

export default function ThemeToggler({ }: Props) {

    const { theme } = useAppSelector(state => state.theme)
    const dispatch = useAppDispatch()
    const isDark = theme === 'dark';

    const toggle = () => {
        if (theme === 'dark') {
            dispatch(setTheme('light'))
        } else {
            dispatch(setTheme('dark'))
        }
    }


    return (
        <div>
            <Button
                size="l"
                view="outlined"
                onClick={toggle}
            >
                <Icon data={isDark ? Sun : Moon} />
            </Button>
        </div>
    )
}