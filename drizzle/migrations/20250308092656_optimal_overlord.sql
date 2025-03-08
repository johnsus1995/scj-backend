ALTER TABLE "attempted_answers" ALTER COLUMN "id" SET START WITH 6666;--> statement-breakpoint
ALTER TABLE "correct_answers" ALTER COLUMN "id" SET START WITH 2222;--> statement-breakpoint
ALTER TABLE "exam_attempts" ALTER COLUMN "id" SET START WITH 3333;--> statement-breakpoint
ALTER TABLE "roles" ALTER COLUMN "id" SET START WITH 4444;--> statement-breakpoint
ALTER TABLE "user_roles" ALTER COLUMN "id" SET START WITH 5555;