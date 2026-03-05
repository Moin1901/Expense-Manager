import pool from "../db/db.ts";

export const getCategory = async (vendor: string) => {

const result = await pool.query(
"SELECT category FROM vendor_category WHERE vendor=$1",
[vendor]
)

if(result.rows.length > 0){
return result.rows[0].category
}

return "Others"

}