import main from "./src/app"

const PORT = process.env.SERVER_PORT

main().then((app: any) => {
    app.listen(PORT, () => {
        console.log("[OK] --> Server running localhost:", PORT)
    })
})
