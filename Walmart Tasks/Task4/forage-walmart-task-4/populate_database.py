import pandas as pd
import sqlite3

# Connect to SQLite database
conn = sqlite3.connect('walmart.db')
cursor = conn.cursor()

# Read and insert data from spreadsheet 0
spreadsheet0 = pd.read_csv('spreadsheet0.csv')
spreadsheet0.to_sql('Products', conn, if_exists='append', index=False)

# Read data from spreadsheet 1 and 2
spreadsheet1 = pd.read_csv('spreadsheet1.csv')
spreadsheet2 = pd.read_csv('spreadsheet2.csv')

# Merge spreadsheet1 with spreadsheet2 to get full shipping details
merged_data = pd.merge(spreadsheet1, spreadsheet2, on='shipping_id')

# Process and insert data into database
for index, row in merged_data.iterrows():
    # Extract relevant data
    shipping_id = row['shipping_id']
    product_name = row['product_name']
    quantity = row['quantity']
    origin = row['origin']
    destination = row['destination']
    
    # Insert into Shipments table
    cursor.execute("INSERT INTO Shipments (shipping_id, origin, destination) VALUES (?, ?, ?)", (shipping_id, origin, destination))
    
    # Insert into ShipmentProducts table
    cursor.execute("INSERT INTO ShipmentProducts (shipping_id, product_name, quantity) VALUES (?, ?, ?)", (shipping_id, product_name, quantity))

# Commit the changes and close the connection
conn.commit()
conn.close()
