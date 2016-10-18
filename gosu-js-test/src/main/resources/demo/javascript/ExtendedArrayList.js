import java.util.ArrayList;

class ExtendedArrayList extends ArrayList{
    printSuperSize() { // Newly added method
        return "The arraylist currently has " + super.size() + " elements" ;
    }

    add (e) { // Overwritten method
        print("Element " +e + " added to array list" );
        super.add(e);
    }
}
