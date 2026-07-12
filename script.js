/*
    LIFE ATLAS INITIALISATION

    Confirms that the JavaScript file has loaded
    correctly.
*/
console.log("Life Atlas loaded.");

// ==================================================
// CORE REFERENCES
// ==================================================

/*
    Main container for the Life Atlas.

    All nodes are created inside this element.
*/

const atlas = document.getElementById("atlas");

// ==================================================
// UTILITY FUNCTIONS
// ==================================================

/*
    Converts percentage-based node coordinates into
    pixel coordinates.

    Nodes are stored as percentages because they are
    responsive to screen size.

    Example:

    x: 50
    y: 45

    becomes:

    x: 960px
    y: 486px

    depending on the viewport dimensions.
*/

function convertPosition(node) {
    const rect = atlas.getBoundingClientRect();
    return {
        x: node.x / 100 * rect.width,
        y: node.y / 100 * rect.height
    };

}

/*
    Calculates where a connection line should stop
    at the edge of a node rather than its centre.
    Uses vector mathematics:

    1. Find direction between nodes.
    2. Normalise the direction.
    3. Move outward by the node radius.
*/

function calculateEdgePoint(start, end) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.sqrt(
        dx * dx + dy * dy
    );

    return {
        x:
            start.x +
            (dx / distance) * start.radius,
        y:
            start.y +
            (dy / distance) * start.radius
    };

}

// ==================================================
// LIFE ATLAS DATA
// ==================================================

/*
    Defines all nodes in the Life Atlas.

    Each node contains:

    id:
        Unique identifier used for references.

    name:
        Display name shown to the user.

    x/y:
        Position within the atlas as percentages.

    radius:
        Visual size of the node.
*/

const nodes = [
    {
        id: "ai",
        name: "AI & Data",
        x: 50,
        y: 45,
        radius: 12
    },

    {
        id: "korea",
        name: "Korea",
        x: 30,
        y: 65,
        radius: 10
    },

    {
        id: "leadership",
        name: "Leadership",
        x: 70,
        y: 60,
        radius: 10
    },

    {
        id: "research",
        name: "Research",
        x: 25,
        y: 30,
        radius: 10
    },

    {
        id: "travel",
        name: "Travel",
        x: 75,
        y: 25,
        radius: 10
    }

];

// ==================================================
// NODE LOOKUP TABLE
// ==================================================

/*
    Creates a lookup object.
*/

const nodeMap = {};

nodes.forEach(node => {
    nodeMap[node.id] = node;
});

// ==================================================
// CREATE CONSTELLATION
// ==================================================

/*
    Creates the visual representation of each node.

    For every item in the nodes array:

    1. Create HTML element.
    2. Apply position.
    3. Add star and label.
    4. Add it to the atlas.
*/

nodes.forEach(node => {

    const element = document.createElement("div");
    element.classList.add("node");

    /*
        Position node using percentage coordinates.

        These match the x/y values stored above.
    */
    element.style.left = `${node.x}%`;

    element.style.top = `${node.y}%`;

    /*
        Creates:

        <div class="star"></div>
        <span>Node Name</span>

        CSS controls the appearance.
    */
    element.innerHTML = `
        <div class="star"></div>
        <span>${node.name}</span>
    `;

    atlas.appendChild(element);

});

// ==================================================
// CURRENT ATLAS DIMENSIONS
// ==================================================

/*
    Stores the current size of the atlas.

    This will become useful when implementing:

    - zooming
    - panning
    - dynamic repositioning
*/

const atlasRect = atlas.getBoundingClientRect();