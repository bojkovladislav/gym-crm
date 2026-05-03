import '@mantine/core/styles.css';
import './globals.css';
import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
    components: {
        Text: {
            styles: {
                root: {
                    color: 'var(--mantine-color-gray-6)',
                },
            },
        },
        Title: {
            styles: {
                root: {
                    color: 'var(--mantine-color-gray-6)',
                },
            },
        },
        InputWrapper: {
            styles: {
                label: {
                    color: 'var(--mantine-color-gray-6)',
                    fontWeight: 500,
                    marginBottom: '3px',
                },
            },
        },
    },
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en' suppressHydrationWarning>
            <head>
                <ColorSchemeScript />
            </head>
            <body>
                <MantineProvider theme={theme}>{children}</MantineProvider>
            </body>
        </html>
    );
}
