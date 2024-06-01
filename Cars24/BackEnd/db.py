import pypyodbc as odbc

# Define constants for the database connection
DRIVER_NAME = "SQL SERVER"
SERVER_NAME = "BT1000109872\\SQLEXPRESS"
DATABASE_NAME = "Cars24"

# Create the connection string
connection_string = f"""
    DRIVER={{{DRIVER_NAME}}};
    SERVER={SERVER_NAME};
    DATABASE={DATABASE_NAME};
    Trust_Connection=yes;
"""

class Queries:
    def __init__(self):
        # Establish a connection to the database
        try:
            self.conn = odbc.connect(connection_string)
            self.cursor = self.conn.cursor()
            print("Connection established successfully")
        except odbc.Error as e:
            print(f"Error connecting to the database: {e}")

    def close_connection(self):
        # Close the cursor and connection
        try:
            self.cursor.close()
            self.conn.close()
            print("Connection closed successfully")
        except odbc.Error as e:
            print(f"Error closing the connection: {e}")

    def execute_query(self, query, params=None):
        try:
            if params:
                self.cursor.execute(query, params)
            else:
                self.cursor.execute(query)
            if not query.strip().lower().startswith("select"):
                self.conn.commit()
            return self.cursor
        except odbc.Error as e:
            print(f"Error executing query: {e}")
            self.conn.rollback()
            return None

    def create_task(self, title, description, status):
        query = """
            INSERT INTO Tasks (Title, Description, Status) 
            VALUES (?, ?, ?)
        """
        self.execute_query(query, (title, description, status))

    def read_tasks(self):
        query = "SELECT * FROM Tasks"
        cursor = self.execute_query(query)
        return cursor.fetchall()

    def task_exists(self, task_id):
        query = "SELECT 1 FROM Tasks WHERE Task_id = ?"
        cursor = self.execute_query(query, (task_id,))
        result = cursor.fetchone()
        return result is not None

    def update_task(self, task_id, title, description, status):
        if not self.task_exists(task_id):
            return False  # Task ID not found, no update performed
        
        query = """
            UPDATE Tasks 
            SET Title = ?, Description = ?, Status = ? 
            WHERE Task_id = ?
        """
        try:
            self.cursor.execute(query, (title, description, status, task_id))
            rows_affected = self.cursor.rowcount  # Get the number of rows affected by the update
            self.conn.commit()
            if rows_affected > 0:
                return True  # Task updated successfully
            else:
                return False  # Update did not affect any rows
        except odbc.Error as e:
            print(f"Error updating task: {e}")
            self.conn.rollback()
            return False  # Task not updated due to error

    def delete_task(self, task_id):
        query = "DELETE FROM Tasks WHERE Task_id = ?"
        cursor = self.execute_query(query, (task_id,))
        return cursor.rowcount > 0

# Test connection
if __name__ == "__main__":
    db = Queries()
    db.close_connection()
