import os
from PIL import Image, ImageDraw, ImageFont

def main():
    # Canvas properties (Render at 2x for high-quality antialiasing)
    scale = 2
    canvas_w = 2600 * scale
    canvas_h = 1600 * scale
    
    # Create canvas with white background
    img = Image.new("RGBA", (canvas_w, canvas_h), "#ffffff")
    draw = ImageDraw.Draw(img)
    
    # Grid background (subtle soft gray grid lines)
    grid_spacing = 40 * scale
    for x in range(0, canvas_w, grid_spacing):
        draw.line([(x, 0), (x, canvas_h)], fill="#f1f5f9", width=1)
    for y in range(0, canvas_h, grid_spacing):
        draw.line([(0, y), (canvas_w, y)], fill="#f1f5f9", width=1)

    # Fonts
    font_path = "C:\\Windows\\Fonts\\segoeui.ttf"
    font_bold_path = "C:\\Windows\\Fonts\\segoeuib.ttf"
    if not os.path.exists(font_path):
        font_path = "C:\\Windows\\Fonts\\arial.ttf"
        font_bold_path = "C:\\Windows\\Fonts\\arialbd.ttf"
        
    try:
        font_title = ImageFont.truetype(font_bold_path, 36 * scale)
        font_subtitle = ImageFont.truetype(font_path, 18 * scale)
        font_header = ImageFont.truetype(font_bold_path, 16 * scale)
        font_body = ImageFont.truetype(font_path, 13 * scale)
        font_body_bold = ImageFont.truetype(font_bold_path, 13 * scale)
        font_legend = ImageFont.truetype(font_path, 14 * scale)
    except IOError:
        # Fallback
        font_title = font_subtitle = font_header = font_body = font_body_bold = font_legend = ImageFont.load_default()

    # Premium Enterprise Palette Colors
    color_entity = "#1E3A5F"     # Deep Navy for core entities
    color_junction = "#334155"   # Slate Blue for junction tables
    
    tables = {
        'Location': {
            'x': 80, 'y': 160, 'w': 380, 'color': color_entity,
            'columns': [
                ('Location_ID', 'VARCHAR(50)', 'PK'),
                ('Name', 'VARCHAR(100)', 'REQ'),
                ('Division', 'VARCHAR(100)', 'REQ'),
                ('District', 'VARCHAR(100)', 'REQ')
            ]
        },
        'Disaster': {
            'x': 80, 'y': 440, 'w': 380, 'color': color_entity,
            'columns': [
                ('Disaster_ID', 'VARCHAR(50)', 'PK'),
                ('DisasterName', 'VARCHAR(150)', 'REQ'),
                ('DisasterType', 'VARCHAR(50)', 'REQ'),
                ('StartDate', 'DATE', 'REQ'),
                ('EndDate', 'DATE', ''),
                ('Location_ID', 'VARCHAR(50)', 'FK')
            ]
        },
        'Occurrence': {
            'x': 80, 'y': 800, 'w': 380, 'color': color_entity,
            'columns': [
                ('Occurrence_ID', 'VARCHAR(50)', 'PK'),
                ('Disaster_ID', 'VARCHAR(50)', 'FK'),
                ('OccurrenceType', 'VARCHAR(100)', 'REQ'),
                ('Level', 'VARCHAR(50)', ''),
                ('ReportedTime', 'TIMESTAMP', 'REQ'),
                ('ResolvedTime', 'TIMESTAMP', '')
            ]
        },
        'Warning': {
            'x': 80, 'y': 1160, 'w': 380, 'color': color_entity,
            'columns': [
                ('Warning_ID', 'VARCHAR(50)', 'PK'),
                ('Disaster_ID', 'VARCHAR(50)', 'FK'),
                ('WarningType', 'VARCHAR(100)', 'REQ'),
                ('Message', 'TEXT', 'REQ'),
                ('WarningDate', 'DATE', 'REQ'),
                ('WarningTime', 'TIME', 'REQ')
            ]
        },
        'RescueTeam': {
            'x': 680, 'y': 160, 'w': 380, 'color': color_entity,
            'columns': [
                ('Team_ID', 'VARCHAR(50)', 'PK'),
                ('TeamName', 'VARCHAR(100)', 'REQ'),
                ('TeamLeader', 'VARCHAR(100)', ''),
                ('ContactNumber', 'VARCHAR(20)', ''),
                ('Equipments', 'TEXT', ''),
                ('Specialization', 'VARCHAR(150)', '')
            ]
        },
        'DisasterAction': {
            'x': 680, 'y': 480, 'w': 380, 'color': color_junction,
            'columns': [
                ('Disaster_ID', 'VARCHAR(50)', 'PK,FK'),
                ('Team_ID', 'VARCHAR(50)', 'PK,FK'),
                ('Task', 'VARCHAR(255)', 'REQ'),
                ('ResponseDate', 'DATE', 'REQ')
            ]
        },
        'Volunteer': {
            'x': 680, 'y': 780, 'w': 380, 'color': color_entity,
            'columns': [
                ('Volunteer_ID', 'VARCHAR(50)', 'PK'),
                ('Team_ID', 'VARCHAR(50)', 'FK'),
                ('Name', 'VARCHAR(100)', 'REQ'),
                ('Age', 'INT', ''),
                ('Gender', 'VARCHAR(20)', ''),
                ('Skills', 'TEXT', ''),
                ('ContactNumber', 'VARCHAR(20)', '')
            ]
        },
        'ReliefCamp': {
            'x': 1280, 'y': 160, 'w': 380, 'color': color_entity,
            'columns': [
                ('ReliefCamp_ID', 'VARCHAR(50)', 'PK'),
                ('Disaster_ID', 'VARCHAR(50)', 'FK'),
                ('Name', 'VARCHAR(150)', 'REQ'),
                ('Capacity', 'INT', ''),
                ('Address', 'VARCHAR(255)', ''),
                ('ContactNumber', 'VARCHAR(20)', '')
            ]
        },
        'Victim': {
            'x': 1280, 'y': 480, 'w': 380, 'color': color_entity,
            'columns': [
                ('Victim_ID', 'VARCHAR(50)', 'PK'),
                ('ReliefCamp_ID', 'VARCHAR(50)', 'FK'),
                ('Name', 'VARCHAR(100)', 'REQ'),
                ('Age', 'INT', ''),
                ('Gender', 'VARCHAR(20)', ''),
                ('HealthStatus', 'VARCHAR(100)', '')
            ]
        },
        'ImpactedBy': {
            'x': 1280, 'y': 840, 'w': 380, 'color': color_junction,
            'columns': [
                ('Disaster_ID', 'VARCHAR(50)', 'PK,FK'),
                ('Victim_ID', 'VARCHAR(50)', 'PK,FK'),
                ('ReliefCamp_ID', 'VARCHAR(50)', 'FK'),
                ('InjuryStatus', 'VARCHAR(100)', ''),
                ('ReliefType', 'VARCHAR(100)', '')
            ]
        },
        'Resource': {
            'x': 1880, 'y': 160, 'w': 380, 'color': color_entity,
            'columns': [
                ('Resource_ID', 'VARCHAR(50)', 'PK'),
                ('ResourceName', 'VARCHAR(100)', 'REQ'),
                ('ResourceType', 'VARCHAR(50)', ''),
                ('QuantityAvailable', 'INT', 'REQ'),
                ('Unit', 'VARCHAR(20)', ''),
                ('UnitCost', 'DECIMAL(10,2)', 'REQ')
            ]
        },
        'ResourceRequest': {
            'x': 1880, 'y': 480, 'w': 380, 'color': color_junction,
            'columns': [
                ('Disaster_ID', 'VARCHAR(50)', 'PK,FK'),
                ('Resource_ID', 'VARCHAR(50)', 'PK,FK'),
                ('Quantity', 'INT', 'REQ'),
                ('RequestDate', 'DATE', 'REQ'),
                ('TotalValue', 'DECIMAL(12,2)', '')
            ]
        },
        'Donor': {
            'x': 1880, 'y': 780, 'w': 380, 'color': color_entity,
            'columns': [
                ('Donor_ID', 'VARCHAR(50)', 'PK'),
                ('Name', 'VARCHAR(150)', 'REQ'),
                ('Type', 'VARCHAR(50)', ''),
                ('ContactNumber', 'VARCHAR(20)', ''),
                ('Email', 'VARCHAR(100)', '')
            ]
        },
        'Donation': {
            'x': 1880, 'y': 1100, 'w': 380, 'color': color_entity,
            'columns': [
                ('Donation_ID', 'VARCHAR(50)', 'PK'),
                ('Donor_ID', 'VARCHAR(50)', 'FK'),
                ('Disaster_ID', 'VARCHAR(50)', 'FK'),
                ('Resource_ID', 'VARCHAR(50)', 'FK'),
                ('DonationType', 'VARCHAR(50)', 'REQ'),
                ('Amount', 'DECIMAL(12, 2)', ''),
                ('DonationDate', 'DATE', 'REQ')
            ]
        }
    }

    # Draw Title Block
    draw.text((80 * scale, 45 * scale), "Relational Schema Diagram", font=font_title, fill="#1E3A5F")
    draw.text((80 * scale, 95 * scale), "Disaster Relief Resource Management System", font=font_subtitle, fill="#334155")

    # Explanatory Architecture Note
    note_text = "Database Physical Architecture Note:\nThis schema shows the physical structure of the database,\nincluding tables, keys, and relationships."
    draw.text((1880 * scale, 45 * scale), note_text, font=font_legend, fill="#64748b")

    # Section Labels / Column Group Annotations
    draw.text((80 * scale, 135 * scale), "Disaster Management", font=font_header, fill="#334155")
    draw.text((680 * scale, 135 * scale), "Rescue Operations & Team Coordination", font=font_header, fill="#334155")
    draw.text((1280 * scale, 135 * scale), "Relief Operations & Victim Support", font=font_header, fill="#334155")
    draw.text((1880 * scale, 135 * scale), "Resource Tracking & Donation Management", font=font_header, fill="#334155")

    # Dimensions
    header_height = 45 * scale
    col_height = 30 * scale
    border_radius = 8 * scale

    # Keep track of table boundaries to draw connections
    table_bounds = {}

    # Draw Tables
    for name, info in tables.items():
        x = info['x'] * scale
        y = info['y'] * scale
        w = info['w'] * scale
        cols = info['columns']
        color = info['color']
        
        h = header_height + (len(cols) * col_height) + (15 * scale)
        table_bounds[name] = {'x1': x, 'y1': y, 'x2': x + w, 'y2': y + h, 'w': w, 'h': h}
        
        # 1. Drop shadow (soft gray offset box)
        draw.rounded_rectangle(
            [x + 4*scale, y + 4*scale, x + w + 4*scale, y + h + 4*scale], 
            radius=border_radius, 
            fill="#e2e8f0"
        )
        
        # 2. Main Body
        draw.rounded_rectangle(
            [x, y, x + w, y + h], 
            radius=border_radius, 
            fill="#ffffff", 
            outline="#d1d5db", 
            width=1 * scale
        )
        
        # 3. Header Rectangle
        draw.rounded_rectangle(
            [x, y, x + w, y + header_height], 
            radius=border_radius, 
            fill=color
        )
        # Cover bottom corners of header to keep them square
        draw.rectangle(
            [x, y + header_height - 6*scale, x + w, y + header_height], 
            fill=color
        )
        
        # Header Text
        draw.text((x + 16*scale, y + 10*scale), name.upper(), font=font_header, fill="#ffffff")
        
        # Columns
        curr_y = y + header_height + 8*scale
        for col_name, col_type, col_key in cols:
            # Indicator text/color based on palette
            if "PK" in col_key and "FK" in col_key:
                key_text, key_color = "PFK", "#06b6d4" # Cyan
            elif "PK" in col_key:
                key_text, key_color = "PK", "#2563eb" # Blue
            elif "FK" in col_key:
                key_text, key_color = "FK", "#10b981" # Emerald
            elif col_key == "REQ":
                key_text, key_color = "*", "#0ea5e9" # Sky Blue
            else:
                key_text, key_color = "", "#64748b"
                
            # Key Label
            if key_text:
                draw.text((x + 16*scale, curr_y), key_text, font=font_body_bold, fill=key_color)
                
            # Column Name
            is_bold = "PK" in col_key or "FK" in col_key or col_key == "REQ"
            name_font = font_body_bold if is_bold else font_body
            name_color = "#1e293b" if is_bold else "#475569"
            draw.text((x + 60*scale, curr_y), col_name, font=name_font, fill=name_color)
            
            # Column Type
            draw.text((x + w - 140*scale, curr_y), col_type, font=font_body, fill="#64748b")
            
            curr_y += col_height

    # Helper function to draw orthogonal lines with arrows using Slate Gray
    def draw_relation_line(start_table, start_side, end_table, end_side, line_color_arg, flow_offset=0):
        line_color = "#64748b" # Fixed Slate Gray
        s = table_bounds[start_table]
        e = table_bounds[end_table]
        
        # Calculate ports
        if start_side == 'right':
            x0, y0 = s['x2'], (s['y1'] + s['y2']) / 2 + flow_offset
        elif start_side == 'left':
            x0, y0 = s['x1'], (s['y1'] + s['y2']) / 2 + flow_offset
        elif start_side == 'bottom':
            x0, y0 = (s['x1'] + s['x2']) / 2 + flow_offset, s['y2']
        else: # top
            x0, y0 = (s['x1'] + s['x2']) / 2 + flow_offset, s['y1']
            
        if end_side == 'right':
            x1, y1 = e['x2'], (e['y1'] + e['y2']) / 2
        elif end_side == 'left':
            x1, y1 = e['x1'], (e['y1'] + e['y2']) / 2
        elif end_side == 'bottom':
            x1, y1 = (e['x1'] + e['x2']) / 2, e['y2']
        else: # top
            x1, y1 = (e['x1'] + e['x2']) / 2, e['y1']
            
        # Draw path
        points = []
        if start_side == 'right' and end_side == 'left':
            # Horizontal route
            mid_x = (x0 + x1) / 2
            points = [(x0, y0), (mid_x, y0), (mid_x, y1), (x1, y1)]
        elif start_side == 'bottom' and end_side == 'top':
            # Vertical route
            mid_y = (y0 + y1) / 2
            points = [(x0, y0), (x0, mid_y), (x1, mid_y), (x1, y1)]
        elif start_side == 'left' and end_side == 'left':
            # C-shape left route
            min_x = min(x0, x1) - 40 * scale
            points = [(x0, y0), (min_x, y0), (min_x, y1), (x1, y1)]
        elif start_side == 'right' and end_side == 'right':
            # C-shape right route
            max_x = max(x0, x1) + 40 * scale
            points = [(x0, y0), (max_x, y0), (max_x, y1), (x1, y1)]
        else:
            # Standard orthogonal step
            points = [(x0, y0), ((x0+x1)/2, y0), ((x0+x1)/2, y1), (x1, y1)]
            
        # Draw line glow & line
        draw.line(points, fill=line_color + "22", width=4 * scale) # Glow (13% opacity)
        draw.line(points, fill=line_color, width=2 * scale) # Solid Line
        
        # Draw dot at start port
        draw.ellipse([x0 - 4*scale, y0 - 4*scale, x0 + 4*scale, y0 + 4*scale], fill=line_color)
        
        # Draw arrow at end port
        arrow_size = 6 * scale
        if end_side == 'left':
            draw.polygon([(x1, y1), (x1 - arrow_size, y1 - arrow_size/2), (x1 - arrow_size, y1 + arrow_size/2)], fill=line_color)
        elif end_side == 'right':
            draw.polygon([(x1, y1), (x1 + arrow_size, y1 - arrow_size/2), (x1 + arrow_size, y1 + arrow_size/2)], fill=line_color)
        elif end_side == 'top':
            draw.polygon([(x1, y1), (x1 - arrow_size/2, y1 - arrow_size), (x1 + arrow_size/2, y1 - arrow_size)], fill=line_color)
        elif end_side == 'bottom':
            draw.polygon([(x1, y1), (x1 - arrow_size/2, y1 + arrow_size), (x1 + arrow_size/2, y1 + arrow_size)], fill=line_color)

    # Drawing Relationship Connections (Slate Gray lines)
    # 1. Location -> Disaster
    draw_relation_line('Location', 'bottom', 'Disaster', 'top', '#64748b')
    
    # 2. Disaster -> Occurrence
    draw_relation_line('Disaster', 'bottom', 'Occurrence', 'top', '#64748b')
    
    # 3. Disaster -> Warning
    # Occurrence is in the middle, so warning routing needs to go left
    draw_relation_line('Disaster', 'left', 'Warning', 'left', '#64748b', flow_offset=-20*scale)
    
    # 4. Disaster -> DisasterAction
    draw_relation_line('Disaster', 'right', 'DisasterAction', 'left', '#64748b', flow_offset=-10*scale)
    
    # 5. RescueTeam -> DisasterAction
    draw_relation_line('RescueTeam', 'bottom', 'DisasterAction', 'top', '#64748b')
    
    # 6. RescueTeam -> Volunteer
    # DisasterAction is in between, route volunteer left
    draw_relation_line('RescueTeam', 'left', 'Volunteer', 'left', '#64748b')
    
    # 7. Disaster -> ReliefCamp
    # Goes from right of Disaster to left of ReliefCamp
    draw_relation_line('Disaster', 'right', 'ReliefCamp', 'left', '#64748b', flow_offset=20*scale)
    
    # 8. ReliefCamp -> Victim
    draw_relation_line('ReliefCamp', 'bottom', 'Victim', 'top', '#64748b')
    
    # 9. Victim -> ImpactedBy
    draw_relation_line('Victim', 'bottom', 'ImpactedBy', 'top', '#64748b')
    
    # 10. Disaster -> ImpactedBy
    # Route around. Go from left of Disaster -> down -> left of ImpactedBy
    draw_relation_line('Disaster', 'left', 'ImpactedBy', 'left', '#64748b', flow_offset=40*scale)
    
    # 11. ReliefCamp -> ImpactedBy
    # ReliefCamp bottom is already connected to Victim. Connect right of ReliefCamp to right of ImpactedBy
    draw_relation_line('ReliefCamp', 'right', 'ImpactedBy', 'right', '#64748b')
    
    # 12. Disaster -> ResourceRequest
    # Route through middle
    draw_relation_line('Disaster', 'right', 'ResourceRequest', 'left', '#64748b', flow_offset=60*scale)
    
    # 13. Resource -> ResourceRequest
    draw_relation_line('Resource', 'bottom', 'ResourceRequest', 'top', '#64748b')
    
    # 14. Donor -> Donation
    draw_relation_line('Donor', 'bottom', 'Donation', 'top', '#64748b')
    
    # 15. Disaster -> Donation
    # Bottom of Disaster to bottom-left of Donation
    draw_relation_line('Disaster', 'bottom', 'Donation', 'left', '#64748b', flow_offset=-40*scale)
    
    # 16. Resource -> Donation
    # Resource is top right, Donation is bottom right. Go from right of Resource to right of Donation
    draw_relation_line('Resource', 'right', 'Donation', 'right', '#64748b')

    # Draw Legend at bottom
    legend_y = canvas_h - 80 * scale
    legend_x = 80 * scale
    
    draw.text((legend_x, legend_y), "LEGEND:", font=font_legend, fill="#475569")
    legend_x += 100 * scale
    
    categories = [
        ("Entity Table", color_entity),
        ("Junction / Association Table", color_junction)
    ]
    
    for cat_name, cat_color in categories:
        draw.rectangle([legend_x, legend_y + 2*scale, legend_x + 16*scale, legend_y + 14*scale], fill=cat_color)
        draw.text((legend_x + 24*scale, legend_y), cat_name, font=font_legend, fill="#475569")
        legend_x += 320 * scale
        
    keys = [
        ("PK", "Primary Key", "#2563eb"),
        ("FK", "Foreign Key", "#10b981"),
        ("PFK", "Composite Key (Combined PK)", "#06b6d4"),
        ("*", "Required Field", "#0ea5e9")
    ]
    
    legend_x = 1100 * scale
    for key_code, key_desc, key_color in keys:
        draw.text((legend_x, legend_y), key_code, font=font_body_bold, fill=key_color)
        draw.text((legend_x + 45*scale, legend_y), key_desc, font=font_legend, fill="#475569")
        legend_x += 220 * scale

    # Resize to original size for high-quality antialiasing (Lanczos downsampling)
    img_resized = img.resize((2600, 1600), Image.Resampling.LANCZOS)
    
    # Save the output image in the workspace and in the artifacts folder
    os.makedirs("C:\\Users\\Md Aktaruzzman Emon\\.gemini\\antigravity-ide\\brain\\0e0395bc-9fa7-4c6a-85b2-63f7bffb9213", exist_ok=True)
    
    workspace_path = "c:\\Users\\Md Aktaruzzman Emon\\antigravity11_IDE\\dfddfa\\assets\\images\\schema_diagram.png"
    artifact_path = "C:\\Users\\Md Aktaruzzman Emon\\.gemini\\antigravity-ide\\brain\\0e0395bc-9fa7-4c6a-85b2-63f7bffb9213\\schema_diagram.png"
    
    img_resized.save(workspace_path, "PNG")
    img_resized.save(artifact_path, "PNG")
    print(f"Diagram successfully generated and saved at:\n- {workspace_path}\n- {artifact_path}")

if __name__ == "__main__":
    main()
