import main from "./src/app"

const PORT = process.env.SERVER_PORT
const LOG = process.env.LOG == "true"? true:false 
main(LOG).then((app: any) => {
    app.listen(PORT, () => {
        if(LOG){
            console.log("[OK] --> Server running localhost:", PORT)
        }
    })
})
