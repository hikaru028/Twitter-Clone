-- Step 1: Add a new temporary column
ALTER TABLE "User" ADD COLUMN "temp_id" SERIAL;

-- Step 3: Drop the old `id` column
ALTER TABLE "User" DROP COLUMN "id";

-- Step 4: Rename the temporary column to `id`
ALTER TABLE "User" RENAME COLUMN "temp_id" TO "id";

-- Step 5: Set the `id` column as the primary key
ALTER TABLE "User" ADD PRIMARY KEY ("id");